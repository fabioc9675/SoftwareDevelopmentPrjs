const mongoose = require("mongoose");
const { Schema } = mongoose;

// data scheme to save data into the database
const TaskSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

// how can I use the scheme as a model
module.exports = mongoose.model("Task", TaskSchema);
