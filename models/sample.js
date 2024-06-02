const mongoose = require("mongoose");

const smapleSchema = new mongoose.Schema({
    name: String,
    role: String,
    age: Number,
    isWorking: Boolean,
});

const Sample = mongoose.model("Sample", smapleSchema)

module.exports = Sample;