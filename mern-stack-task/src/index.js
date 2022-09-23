const express = require("express");
const morgan = require("morgan");
const path = require("path");
const app = express(); // server

const { mongoose } = require("./database");

// Settings
app.set("port", process.env.PORT || 3000); // takes the port provided for the server or other

// Middlewares
app.use(morgan("dev")); // creates a log for clients that request access to the app
app.use(express.json()); // every data that arrives to the server enters to this and it verifies if the data is a json

// Routes
app.use("/api/task", require("./routes/task.routes")); // adding prefix to the route

// Static files
// console.log(path.join(__dirname, "public"));
app.use(express.static(path.join(__dirname, "public"))); // use html file inside public folder

// Starting the server
app.listen(app.get("port"), () => {
  console.log(`Server on port ${app.get("port")}`);
});
