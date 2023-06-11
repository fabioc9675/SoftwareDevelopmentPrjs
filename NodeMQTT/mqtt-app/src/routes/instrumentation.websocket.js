// import Schema
const Instrument = require("../models/instrumentation");

socketio = (io) => {
    // Socket initialization
    io.on("connection", (socket) => {
        console.log("socket.io: User connected: ", socket.id);

        // Socket disconnection
        socket.on("disconnect", () => {
            console.log("socket.io: User disconnected: ", socket.id);
        });

        // socket subscription
        socket.on("subscribe", ({ endpoint }) => {
            socket.join(endpoint);
            console.log("A device subscribed to: " + endpoint);
        });

        // socket unsubscription
        socket.on("unsubscribe", ({ endpoint }) => {
            socket.leave(endpoint);
            console.log("A device disconnected from: " + endpoint);
        });

        // socket update
        socket.on("update", async ({ endpoint, value }) => {
            console.log("Transaction:", endpoint, "<-", value);
            // Some actions and an emit function here
        });

        // ***************************************************************
        // ****** Additional socket routes *******************************
        // ***************************************************************

        socket.on("event_name", async (message) => {
            console.log(message);

            io.emit("notify", message.now);
            // Some actions and an emit function here
        });

        socket.on("socketData", async (payload) => {
            console.log(payload.varvalue);
            // const data = {
            //     topic: "socketData",
            //     message: JSON.parse(payload),
            // };

            const instrumentObj = new Instrument({
                type: "websocket",
                topic: "iotUdeA/socketData",
                author: payload.author,
                varname: payload.varname,
                varvalue: payload.varvalue,
            });
            // save data to db
            await instrumentObj
                .save()
                .then(() =>
                    console.log("Data saved to MongoDB:", instrumentObj)
                )
                .catch((err) =>
                    console.log("Error saving data to MongoDB:", err)
                );

            io.emit("reception", "Received");
            // Some actions and an emit function here
        });
    });
};

module.exports = socketio;
