const express = require("express");
const path = require("path");
const journalRoutes = require("./routes/journalRoutes");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use("/", journalRoutes);

module.exports = app;
