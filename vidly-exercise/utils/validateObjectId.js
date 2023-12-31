const mongoose = require("mongoose");

const validateObjectId = (req, res, next) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).send("Invalid ID.");
  }
  next();
};

exports.validateObjectId = validateObjectId;
