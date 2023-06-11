// import Schema
const Instrument = require("../models/instrumentation");

mqtt = (client, mqttTopic, mongoose) => {
    // MQTT connection
    client.on("connect", () => {
        console.log("Connected to MQTT");
        client.subscribe([mqttTopic], (err) => {
            if (err) console.log("Error subscribing to MQTT:", err);
            else console.log("Subscribed to MQTT topic:", mqttTopic);
        });
    });

    // ***************************************************************
    // ****** Additional mqtt routes *********************************
    // ***************************************************************

    client.on("message", async (topic, payload) => {
        const data = {
            topic: topic,
            message: JSON.parse(payload),
        };

        const instrumentObj = new Instrument({
            type: "mqtt",
            topic: data.topic,
            author: data.message.author,
            varname: data.message.varname,
            varvalue: data.message.varvalue,
        });
        // save data to db
        await instrumentObj
            .save()
            .then(() => console.log("Data saved to MongoDB:", instrumentObj))
            .catch((err) => console.log("Error saving data to MongoDB:", err));
    });
};

module.exports = mqtt;
