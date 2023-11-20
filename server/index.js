const express = require("express");
const mongoose = require("mongoose");
const router = require("./router");
const cors = require("cors");


const app = express();

app.use(cors());


app.use(express.urlencoded({ extended: false }));
app.use(express.json());


app.use('/uploads', express.static('uploads')); // Serve uploaded files


app.use(router);


mongoose.set("strictQuery", false);
mongoose.connect("mongodb://127.0.0.1:27017/fitnessProGym", { useNewUrlParser: true, useUnifiedTopology: true });


app.listen(5000, () => console.log("Server is listening on port 5000..."));