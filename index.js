const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const connectDB = require("./db");
const articleRoute = require("./routes/article.route");

const app = express();
const PORT = 5000;

connectDB();

// parse json bodies
app.use(express.json());
// parse url encoded bodies
app.use(express.urlencoded({ extended: false }));

app.use(express.static(__dirname + "/public"));

// view engine setup
app.set("views", path.join(__dirname + "/public/views"));
app.set("view engine", "pug");

app.use("/", articleRoute);

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
