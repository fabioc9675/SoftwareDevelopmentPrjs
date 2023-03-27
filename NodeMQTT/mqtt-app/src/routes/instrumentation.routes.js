const express = require("express");
const router = express.Router();

// import Schema
const Instrument = require("../models/instrumentation");

// reading data from database
router.get("/", async (req, res, next) => {
    // make a request for the database
    const instrumentObj = await Instrument.find();
    // when client ask for '/' server response
    res.json(instrumentObj);
});

module.exports = router;
