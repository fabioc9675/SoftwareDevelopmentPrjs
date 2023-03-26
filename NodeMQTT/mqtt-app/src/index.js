const express = require("express");
const cors = require("cors");
const mqtt = require("mqtt");

const app = express(); // server
const port = process.env.PORT || 3000;
const server = require("http").createServer(app);

// Settings
app.set("port", port); // takes the port provided for the server or other

// Middlewares
app.use(express.json()); // every data that arrives to the server enters to this and it verifies if the data is a json
app.use(cors());

// Starting the server
server.listen(app.get("port"), () => {
    console.log(`Server on port ${app.get("port")}`);
});

const host = "broker.emqx.io";
const port_mqtt = "1883";
const clientId = `mqtt_${Math.random().toString(16).slice(3)}`;

const connectUrl = `mqtt://${host}:${port_mqtt}`;
const client = mqtt.connect(connectUrl, {
    clientId,
    clean: true,
    connectTimeout: 4000,
    username: "testuser",
    password: "testpass",
    reconnectPeriod: 1000,
});

const topic1 = "esp32/temperature";
const topic2 = "esp32/humidity";
client.on("connect", () => {
    console.log("Connected");
    client.subscribe([topic1, topic2], () => {
        console.log(`Subscribe to topic '${topic1}' and '${topic2}'`);
    });
});
client.on("message", (topic, payload) => {
    console.log("Received Message:", topic, payload.toString());
});
