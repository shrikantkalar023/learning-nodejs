const EventEmitter = require("node:events");

const emitter = new EventEmitter();

let url = "http://mylogger.io/log";

emitter.on("logging", (eventArg) => {
  console.log("Logging Listener called", eventArg);
});

const log = (message) => {
  emitter.emit("logging", { data: message });
  // Send an HTTP request
  console.log(message);
};

module.exports = log;
