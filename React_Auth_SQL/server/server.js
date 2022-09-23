const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const connection = require("./models/database");
const authRoutes = require("./routes/authRoutes");
const cookieParser = require("cookie-parser");

const app = express();

// socket connection
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

var Task = require("./models/task");

// config permisions to use crdentials and send cokies
const corsConfig = {
  origin: true,
  credentials: true,
};

app.use(cors(corsConfig));
app.use(bodyParser.json());
app.use(cookieParser());

// function to get all task
app.get("/task", async (req, res) => {
  // make a query through sequelize
  const response = await Task.findAll()
    .then(function (data) {
      const result = { success: true, data: data };
      return result;
    })
    .catch((error) => {
      const result = { success: false, error: error };
      return result;
    });

  console.log(response);
  //res.send(response);
  res.json(response);
});

// socket initialization
io.on("connection", (socket) => {
  console.log("socket.io: User connected: ", socket.id);

  socket.on("disconnect", () => {
    console.log("socket.io: User disconnected: ", socket.id);
  });
});

// function to add task
app.post("/addTask", (req, res) => {
  const ADD_QUERY = `INSERT INTO TASKs(TASK_NAME) VALUES ("${req.body.task}")`;

  console.log(ADD_QUERY);

  connection.query(ADD_QUERY, (err) => {
    if (err) console.log(err);
  });

  res.send("you can add task");
});

// function to delete task
app.get("/deleteTask", (req, res) => {
  res.send("delete task");
});

// this part is necessary to share io component with router functions
app.use(function (req, res, next) {
  req.io = io;
  next();
});
// link server functions to authentication methods
app.use(authRoutes);

// cookies initialization
app.get("/set-cookies", (req, res) => {
  // set a cookie un web browser
  // res.setHeader("Set-Cookie", "newUser=true");
  res.cookie("newUser", false);
  res.cookie("isEmployee", true, {
    maxAge: 1000 * 60 * 60 * 24,
    secure: false,
    httpOnly: true,
  }); // duration of the cookie, 1 day, secure:true is to use just with HTTPS, httpOnly:true, just allow access with http
  res.send("you got the cookies");
});

app.get("/read-cookies", (req, res) => {
  // asking for cookies
  const cookies = req.cookies;
  console.log(cookies);

  res.json(cookies);
});

// server initialization
server.listen(4000, () => {
  console.log("running on port 4000");
});

module.exports = app;
