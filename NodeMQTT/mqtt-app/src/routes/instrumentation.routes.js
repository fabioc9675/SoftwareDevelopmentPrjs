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

// ***************************************************************
// ****** Additional routes to get data **************************
// ***************************************************************

// reading data by author and topic
router.get(
    "/author/:author/type/:type/subtopic/:subtopic/varname/:varname",
    async (req, res) => {
        // make a request to the database
        // Examples
        // http://localhost:5000/api/instrumentation/author/Fabian/topic/iotUdeA/pipeline
        const author = req.params.author;
        const type = req.params.type;
        const topic = "iotUdeA/" + req.params.subtopic;
        const varname = req.params.varname;

        // query to the database
        const instrumentObj = await Instrument.find({
            type: type,
            author: author,
            topic: topic,
            varname: varname,
        }).sort({ createdAt: 1 });
        // response
        res.json(instrumentObj);
    }
);

// reading authors form database
router.get("/authors", async (req, res) => {
    // make a request to the database
    // Examples
    // http://localhost:5000/api/instrumentation/authors
    const instrumentObj = await Instrument.distinct("author");
    // response
    res.json(instrumentObj);
});

// reading authors form database
router.get("/author/:author/types", async (req, res) => {
    // make a request to the database
    // Examples
    // http://localhost:5000/api/instrumentation/authors
    const author = req.params.author;
    const instrumentObj = await Instrument.distinct("type", {
        author: author,
    });
    // response
    res.json(instrumentObj);
});

// reading authors form database
router.get("/author/:author/type/:type/topics", async (req, res) => {
    // make a request to the database
    // Examples
    // http://localhost:5000/api/instrumentation/authors
    const author = req.params.author;
    const type = req.params.type;
    const instrumentObj = await Instrument.distinct("topic", {
        author: author,
        type: type,
    });
    // response
    res.json(instrumentObj);
});

// reading authors form database
router.get(
    "/author/:author/type/:type/topic/:topic/varnames",
    async (req, res) => {
        // make a request to the database
        // Examples
        // http://localhost:5000/api/instrumentation/authors
        const author = req.params.author;
        const type = req.params.type;
        const topic = "iotUdeA/" + req.params.topic;
        const instrumentObj = await Instrument.distinct("varname", {
            author: author,
            topic: topic,
            type: type,
        });
        // response
        res.json(instrumentObj);
    }
);

// ***************************************************************
// ****** Additional routes to post data *************************
// ***************************************************************

// Posting data into database  // {'place': 'FABIAN', 'monitor': 1, 'typeDat': 'SAMPLE', 'temp_env': 24.0, 'mois_env': 46.0, 'noise_env': 430.2, 'distance': [17.0, 23.8], 'nPerson': 2}
// curl -X POST -H "Content-Type: application/json" -d '{"type": "webserver", "topic": "iotUdeA/pipeline", "author":"Fabian", "varname":"Humidity", "varvalue":89.9}' http://localhost:3000/api/instrumentation
router.post("/", async (req, res, next) => {
    // make a posting to the database
    const { type, topic, author, varname, varvalue } = req.body; // create an object from the body of the POST request
    const instrumentObj = new Instrument({
        type,
        topic,
        author,
        varname,
        varvalue,
    });
    console.log(instrumentObj);
    // Post the data
    await instrumentObj.save();
    res.json({ status: "Instrument Data Recorded" });
});

// Updating data into the database
router.put("/id/:id", async (req, res, next) => {
    // make an update into the database
    const { type, topic, author, varname, varvalue } = req.body; // create an object from the body of the POST request
    const instrumentObj = {
        type,
        topic,
        author,
        varname,
        varvalue,
    };
    // Update the data
    await Instrument.findByIdAndUpdate(req.params.id, instrumentObj);
    res.json({ status: "Instrument Data Modified" });
});

// Deleting data in the database
router.delete("/id/:id", async (req, res) => {
    // Make a delete of data into the database
    await Instrument.findByIdAndRemove(req.params.id);
    res.json({ status: "Instrument Data Deleted" });
});

module.exports = router;
