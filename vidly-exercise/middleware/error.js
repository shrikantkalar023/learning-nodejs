module.exports = (err, req, res, next) => {
  // TODO: Log the error
  res.status(500).send("Something Failed on Server");
};
