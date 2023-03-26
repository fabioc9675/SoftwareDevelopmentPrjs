var Sequelize = require("sequelize"); //import sequelize
var database = require("./database"); // importing connection database

// creation of table without adding createdAt from Sequelize library
var Task = database.define(
  "TASKs",
  {
    TASK_ID: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    TASK_NAME: Sequelize.STRING,
    TASK_TIMESTAMP: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
  },
  {
    timestamps: false, // to use personalized timestamp
  }
);

module.exports = Task;
