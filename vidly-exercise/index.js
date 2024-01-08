const express = require("express");
require("express-async-errors");
const mongoose = require("mongoose");
const app = express();
const config = require("config");
const Joi = require("joi");
const error = require("./middleware/error");
Joi.objectId = require("joi-objectid")(Joi);

// Built-in middleware
app.use(express.json());

// routes
app.use("/api/genres", require("./routes/genres"));
app.use("/api/customers", require("./routes/customers"));
app.use("/api/movies", require("./routes/movies"));
app.use("/api/rentals", require("./routes/rentals"));
app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/", require("./routes/home"));

// error middleware
app.use(error);

const dbPassword = config.get("dbPassword");
const jwtPrivateKey = config.get("jwtPrivateKey");

// if (!dbPassword || !jwtPrivateKey) {
if (!jwtPrivateKey) {
  console.error("FATAL ERROR: dbPassword or jwtPrivateKey is not defined.");
  process.exit(1);
}

mongoose
  // .connect(
  //   `mongodb+srv://Shrikant:${dbPassword}@shrikantlearnsmongodb.vd1wx.mongodb.net/vidly?retryWrites=true&w=majority`
  // )
  .connect("mongodb://localhost/vidly")
  .then(() => {
    console.log("Connected to MongoDB...");
    // Start server
    const port = process.env.PORT || 3000;
    app.listen(port, () => console.log(`Listening on port ${port}...`));
  })
  .catch((err) => console.error("Could not connect to MongoDB...", err));
