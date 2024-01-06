const mongoose = require("mongoose");

// For get by id , put and delete requests, we need to validate the id
module.exports = (req, res, next) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).send("Invalid ID.");
  }
  next();
};
