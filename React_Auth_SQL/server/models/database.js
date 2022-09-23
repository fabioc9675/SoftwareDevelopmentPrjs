var Sequelize = require("sequelize");
const mysql = require("mysql2");
require("dotenv").config();

// use pool to mantain the connection
const connection = new Sequelize(
  process.env.DB_DATABASE, // name database
  process.env.DB_USER, // user database
  process.env.DB_PASSWORD, // password database

  {
    host: process.env.DB_HOST,
    dialect: "mysql", // mariadb / sqlite / postgres / mysql2
  }
);

// ... later
connection.sync();

module.exports = connection;
