var Users = require("../models/user");
var jwt = require("jsonwebtoken");

// handle errors
const handleErrors = (err) => {
  // console.log(err.message, err.code);
  let error = { USER_NAME: "", USER_PASS: "", USER_MAIL: "" };

  // incorrect email
  if (err.message === "incorrect User or Email") {
    error.USER_NAME = "Incorrect Username, not registered";
    error.USER_MAIL = "Incorrect Email, not registered";
  }

  // incorrect password
  if (err.message === "incorrect Password") {
    error.USER_PASS = "Incorrect Password";
  }

  // validation errors
  if (err.message.includes("Validation error")) {
    Object.values(err.errors).forEach((_error) => {
      error[_error.path] = _error.message;
      // console.log(error);
    });
  }
  return error;
};

// create token
const maxAge = 3 * 24 * 60 * 60; // time in seconds
const createToken = (id) => {
  return jwt.sign({ id }, "Fabian App secret", {
    expiresIn: maxAge,
  });
};

module.exports.signup_get = (req, res) => {
  res.send("signup requested");
  console.log("signup");
};

module.exports.login_get = (req, res) => {
  res.send("login requested");
  console.log("login");
};

module.exports.signup_post = async (req, res) => {
  const { USER_NAME, USER_PASS, USER_TOKEN, USER_MAIL } = req.body; // need to have the same variable name that in the json structure from frontend
  const io = req.io; // load io component from server

  // res.send("new signup requested");
  console.log("new signup");
  console.log(USER_NAME, USER_PASS, USER_TOKEN, USER_MAIL);

  io.emit("signMessage", "Registering New User"); // emit some message from socket

  try {
    const user = await Users.create({
      USER_NAME: USER_NAME,
      USER_PASS: USER_PASS,
      USER_TOKEN: USER_TOKEN,
      USER_MAIL: USER_MAIL,
    });
    io.emit("signMessage", "New User registered"); // emit some message from socket
    // create JsonWebToken
    const token = createToken(user.USER_ID);
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: false,
      maxAge: maxAge * 1000,
    });
    res.status(201).json(user); // .send("new signup requested");
  } catch (error) {
    const errors = handleErrors(error);
    console.log(errors);
    res.status(400).json(errors);
    io.emit(
      "signMessage",
      errors.USER_NAME + "; " + errors.USER_PASS + "; " + errors.USER_MAIL
    ); // emit some message from socket
  }
};

module.exports.login_post = async (req, res) => {
  const { USER_NAME, USER_PASS, USER_TOKEN, USER_MAIL } = req.body; // need to have the same variable name that in the json structure from frontend
  const io = req.io; // load io component from server

  // res.send("new signup requested");
  console.log("new login");
  console.log(USER_NAME, USER_PASS, USER_TOKEN, USER_MAIL);

  io.emit("logMessage", "Trying to do login"); // emit some message from socket

  // make a comparisons with database data
  try {
    const user = await Users.login(USER_NAME, USER_PASS, USER_MAIL);
    io.emit("logMessage", "Login successfully"); // emit some message from socket

    // create and send token, create JsonWebToken
    const token = createToken(user.USER_ID);
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: false,
      maxAge: maxAge * 1000,
    });
    return res.status(200).json({ USER_ID: user.USER_ID }); // need the return because ERR_HTTP_HEADERS_SENT
  } catch (err) {
    const errors = handleErrors(err);
    console.log(errors);

    io.emit("logMessage", err); // emit some message from socket
    return res.status(400).json(errors);
  }

  //  res.send("user login requested");
};
