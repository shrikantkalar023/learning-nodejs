const express = require("express");
const mongoose = require("mongoose");
const app = express();
const config = require("config");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

// Built-in middleware
app.use(express.json());

app.use("/api/genres", require("./routes/genres"));
app.use("/api/customers", require("./routes/customers"));
app.use("/api/movies", require("./routes/movies"));
app.use("/api/rentals", require("./routes/rentals"));
app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/", require("./routes/home"));

const password = config.get("dbPassword");
mongoose
  .connect(
    `mongodb+srv://Shrikant:${password}@shrikantlearnsmongodb.vd1wx.mongodb.net/vidly?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("Connected to MongoDB...");
    // Start server
    const port = process.env.PORT || 3000;
    app.listen(port, () => console.log(`Listening on port ${port}...`));
  })
  .catch((err) => console.error("Could not connect to MongoDB...", err));
