const mongoose = require("mongoose");

// const URI = "mongodb://localhost/mern-tasks";
const URI =
  "mongodb+srv://fabcastan:pDZDZqe9icON6UJl@cluster0.7lwrz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

mongoose
  .connect(URI) // create connection to local mongodb database
  .then((db) => console.log("DB is connected"))
  .catch((err) => console.error(err));

module.exports = mongoose;
