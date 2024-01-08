const winston = require("winston");
require("winston-mongodb");
const config = require("config");

const dbPassword = config.get("dbPassword");

module.exports = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  transports: [
    // new winston.transports.Console(), // for console logging
    new winston.transports.File({ filename: "logfile.log", level: "error" }),
    new winston.transports.MongoDB({
      level: "error",
      db: "mongodb://localhost/vidly",
      // db: `mongodb+srv://Shrikant:${dbPassword}@shrikantlearnsmongodb.vd1wx.mongodb.net/vidly?retryWrites=true&w=majority`,
      options: { useUnifiedTopology: true },
    }),
  ],
});
