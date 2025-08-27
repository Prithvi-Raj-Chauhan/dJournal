const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

const journalRoutes = require("./routes/journals");

app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

// Routes
app.use("/", journalRoutes);

app.listen(port, () => console.log(`Listening at port ${port}`));
