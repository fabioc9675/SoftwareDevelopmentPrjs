const express = require("express");
const path = require("path");
const app = express(); // server

const port = process.env.PORT || 5000;

// Socket setup
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
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

// Socket initialization
io.on("connection", (socket) => {
    console.log("socket.io: User connected: ", socket.id);

    socket.on("disconnect", () => {
        console.log("socket.io: User disconnected: ", socket.id);
    });

    socket.on("subscribe", ({ endpoint }) => {
        socket.join(endpoint);
        console.log("A device subscribed to: " + endpoint);
    });

    socket.on("unsubscribe", ({ endpoint }) => {
        socket.leave(endpoint);
        console.log("A device disconnected from: " + endpoint);
    });

    socket.on("update", async ({ endpoint, value }) => {
        console.log("Transaction:", endpoint, "<-", value);
        // Some actions and an emit function here
    });

    socket.on("event_name", async (message) => {
        console.log(message);

        io.emit("notify", message.now);
        // Some actions and an emit function here
    });
});

// Starting the server
server.listen(app.get("port"), () => {
    console.log(`Server on port ${app.get("port")}`);
});
