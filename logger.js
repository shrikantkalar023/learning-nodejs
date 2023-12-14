const EventEmitter = require("node:events");

class Logger extends EventEmitter {
  log = (message) => {
    this.emit("logging", { data: message });
    // Send an HTTP request
    console.log(message);
  };
}

module.exports = Logger;
