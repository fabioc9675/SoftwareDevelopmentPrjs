const mongoose = require("mongoose");
const { Schema } = mongoose;

// data schema to save data into the database
const InstrumentSchema = new Schema(
    {
        type: { type: String, required: true },
        topic: { type: String, required: true },
        author: { type: String, required: true },
        varname: { type: String, required: true },
        varvalue: { type: Number, default: 0 },
    },
    {
        timestamps: true,
    }
);

// how can I use the schema as a model
module.exports = mongoose.model("instrument", InstrumentSchema); // Label must be tha same as name collection in MongoDB Atlas
