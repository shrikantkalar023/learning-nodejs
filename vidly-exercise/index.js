require("express-async-errors");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const config = require("config");
const express = require("express");
const app = express();
require("./startup/routes")(app);
require("./startup/db")(app);

const dbPassword = config.get("dbPassword");
const jwtPrivateKey = config.get("jwtPrivateKey");

if (!dbPassword || !jwtPrivateKey) {
  // if (!jwtPrivateKey) {
  console.error("FATAL ERROR: dbPassword or jwtPrivateKey is not defined.");
  process.exit(1);
}
