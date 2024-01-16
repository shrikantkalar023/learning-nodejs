const winstonLogger = require("../middleware/logger");

module.exports = (err, req, res, next) => {
  winstonLogger.error(err.message, err);
  res.status(500).send("Something Failed on Server");
};
