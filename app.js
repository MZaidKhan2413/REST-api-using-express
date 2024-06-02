const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Sample = require("./models/sample")

main().then(()=>{
    console.log("DB connection success")
}).catch(err => console.log(err))

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/rest_api")
}

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());

app.post("/api/v1/samples", async (req, res)=>{
    try {
        const sample = await Sample.create(req.body);
        res.status(201).json({
            success: true,
            sample
        })
    } catch(err) {
        res.status(500).json({
            success: false,
            message: err
        })
    }
})

app.get("/api/v1/samples", async (req, res)=>{
    try {
        const samples = await Sample.find();
        res.status(200).json({
            success: true,
            samples
        })
    } catch(err) {
        res.status(500).json({
            success: false,
            message: err
        })
    }
})

app.get("/api/v1/samples/:id", async (req, res)=>{
    try {
        const sample = await Sample.findById(req.params.id);
        res.status(200).json({
            success: true,
            sample
        })
    } catch(err) {
        res.status(500).json({
            success: false,
            message: err
        })
    }
})

app.put("/api/v1/samples/:id", async (req, res)=>{
    try {
        let sample = await Sample.findByIdAndUpdate(req.params.id, req.body, {new: true, useFindAndUpdate: false, runValidators: true})
        res.status(200).json({
            success: true,
            sample
        })
    } catch(err) {
        res.status(500).json({
            success: false,
            message: err
        })
    }
})

app.delete("/api/v1/samples/:id", async (req, res)=>{
    try {
        let sample = await Sample.findByIdAndDelete(req.params.id);
        res.status(200).json({
            success: true,
            sample
        })
    } catch(err) {
        res.status(500).json({
            success: false,
            message: err
        })
    }
})


app.listen(port, ()=>{
    console.log("App is listening at port: "+port);
})