const express = require("express");
const router = express.Router();

const Task = require("../models/task");

// reading data from database
router.get("/", async (req, res) => {
  // make a request for the database
  const tasks = await Task.find();
  // when client ask for '/' server response
  res.json(tasks);
});

// reading data by id
router.get("/id/:id", async (req, res) => {
  // make a request for the database
  const task = await Task.findById(req.params.id);
  // when client ask for '/' server response
  res.json(task);
});

// reading data by date
router.get("/date/:start/:end", async (req, res) => {
  // make a request for the database
  // Examples
  // http://localhost:3000/api/task/date/2021-10-05/2021-10-06T10:00:00Z
  // http://localhost:3000/api/task/date/2021-10-06T06:00:00Z/2021-10-06T07:00:00Z
  const start = new Date(req.params.start);
  const end = new Date(req.params.end);
  const task = await Task.find({
    createdAt: {
      $gte: start,
      $lt: end,
    },
  });
  // when client ask for '/' server response
  res.json(task);
});

// adding data to the database
router.post("/", async (req, res) => {
  const { title, description } = req.body;
  const task = new Task({ title, description });
  console.log(task);
  await task.save();
  res.json({ status: "Task Recorded" });
});

// update data
router.put("/id/:id", async (req, res) => {
  const { title, description } = req.body;
  const newTask = { title, description };
  await Task.findByIdAndUpdate(req.params.id, newTask);
  res.json({ status: "Task Modified" });
});

// delete data
router.delete("/id/:id", async (req, res) => {
  await Task.findByIdAndRemove(req.params.id);
  res.json({ status: "Task Deleted" });
});

module.exports = router;
