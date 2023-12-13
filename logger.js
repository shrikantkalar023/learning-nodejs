console.log(__filename);
console.log(__dirname);
let url = "http://mylogger.io/log";

const log = (message) => {
  // Send an HTTP request
  console.log(message);
};

module.exports = log;
// can export an obj or a fn
