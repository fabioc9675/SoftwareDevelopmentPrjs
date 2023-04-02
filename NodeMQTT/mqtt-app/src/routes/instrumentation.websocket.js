const Instrument = require("../models/instrumentation");

module.exports = (io) => {
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
};
