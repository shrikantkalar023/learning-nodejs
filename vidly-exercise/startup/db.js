const mongoose = require("mongoose");
const config = require("config");
const logger = require("../middleware/logger");

const dbPassword = config.get("dbPassword");

module.exports = (app) =>
  mongoose
    .connect(
      `mongodb+srv://Shrikant:${dbPassword}@shrikantlearnsmongodb.vd1wx.mongodb.net/vidly?retryWrites=true&w=majority`
    )
    //   .connect("mongodb://localhost/vidly")
    .then(() => {
      logger.info("Connected to MongoDB...");
      const port = process.env.PORT || 3000;
      app.listen(port, () => console.log(`Listening on port ${port}...`));
    });
