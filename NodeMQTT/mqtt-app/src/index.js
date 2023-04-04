const express = require("express");
const path = require("path");
const cors = require("cors");
const mqtt = require("mqtt");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express(); // server

// URI connection
const URI = process.env.REACT_APP_URI; // Environment variable
const port = process.env.PORT || 3000;
const connection = mongoose.connection;

// Socket setup
const server = require("http").createServer(app);
const socketClient = require("socket.io")(server, {
    cors: {
        origin: "*",
        credentials: true,
    },
});

// Settings
app.set("port", port); // takes the port provided for the server or other

// Middlewares
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
}); // Helps to handle CORS issues

app.use(express.json()); // every data that arrives to the server enters to this and it verifies if the data is a json

// mqtt client connection
const clientId = `mqtt_${Math.random().toString(16).slice(3)}`;
// const connectUrl = `mqtt://${process.env.MQTT_URI}:${process.env.MQTT_PORT}`; // to use TCP MQTT, port 1883, Url: broker.emqx.io
const connectUrl = `ws://${process.env.REACT_APP_MQTT_URI}:${process.env.REACT_APP_MQTT_PORT}/mqtt`; // to use WS MQTT, port 8083, Url: broker.emqx.io
const mqttClient = mqtt.connect(connectUrl, {
    clientId,
    clean: true,
    connectTimeout: 4000,
    username: process.env.REACT_APP_MQTT_USER,
    password: process.env.REACT_APP_MQTT_PASS,
    reconnectPeriod: 1000,
});

// Connect to the database
mongoose
    .connect(URI) // create connection to mongodb database
    .then((db) => console.log("Database is connected"))
    .catch((err) => console.error(err));

// mqtt connection configuration
const topicData = "iotUdeA/pipeline"; // topic to save data
require("./routes/instrumentation.mqtt")(mqttClient, topicData, mongoose);

// websocket connection configuration
require("./routes/instrumentation.websocket")(socketClient);

// Routes
app.use("/api/instrumentation", require("./routes/instrumentation.routes")); // adding prefix to the route

// Static files for development
app.use(express.static(path.join(__dirname, "../frontend/public"))); // adding prefix to the route
/*
// Static files for deployment
app.use(express.static(path.join(__dirname, "../frontend/build"))); // adding prefix to the route
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/build", "index.html")); // Heroku creates the build for us
});
*/

// Socket initialization
socketClient.on("connection", (socket) => {
    console.log("socket.io: User connected: ", socket.id);

    socket.on("disconnect", () => {
        console.log("socket.io: User disconnected: ", socket.id);
    });
});

// Starting the server
server.listen(app.get("port"), () => {
    console.log(`Server on port ${app.get("port")}`);
});

// initialization of collection watch
connection.once("open", () => {
    console.log("MongoDB database connected");

    // Setting change streams in the database
    console.log("Setting change streaming");
    const monitoringChangeStream = connection.collection("instruments").watch();

    // Handle the event on change
    monitoringChangeStream.on("change", (change) => {
        switch (change.operationType) {
            case "insert":
                console.log("data inserted");
                socketClient.emit(
                    "notify",
                    `notification from ${change.fullDocument._id}`
                );
        }
    });
});
