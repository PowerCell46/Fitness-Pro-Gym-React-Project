const express = require("express");
const mongoose = require("mongoose");
const router = require("./router");
const cors = require("cors");


const app = express();

app.use(cors());


app.use(express.urlencoded({ extended: false }));
app.use(express.json());


app.use('/images', express.static('uploads'));


app.use(router);


mongoose.set("strictQuery", false);
// mongodb://127.0.0.1:27017/fitnessProGym <----> Local Database
mongoose.connect("mongodb+srv://PowerCell46:PowerCell46@cluster0.xhq46jq.mongodb.net/", { useNewUrlParser: true, useUnifiedTopology: true });
// mongoose.set('debug', true);


app.listen(5000, () => console.log("Server is listening on port 5000..."));