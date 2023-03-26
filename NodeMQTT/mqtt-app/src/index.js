const mqtt = require("mqtt");

const host = "broker.emqx.io";
const port = "1883";
const clientId = `mqtt_${Math.random().toString(16).slice(3)}`;

const connectUrl = `mqtt://${host}:${port}`;
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
