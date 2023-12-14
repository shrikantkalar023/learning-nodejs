const EventEmitter = require("node:events");
const log = require("./logger");
// Create an instance of the EventEmitter class
const emitter = new EventEmitter();

// Listener for the below event
emitter.on("messageLogged", (eventArg) => {
  console.log("Listener called", eventArg);
});

// Raise an event
emitter.emit("messageLogged", { id: 1, url: "http://" });

log("signal");
