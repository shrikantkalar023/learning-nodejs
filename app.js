const EventEmitter = require("node:events");

// Create an instance of the EventEmitter class
const emitter = new EventEmitter();

// Listener for the below event
emitter.on("messageLogged", () => {
  console.log("Listener called");
});

// Raise an event
emitter.emit("messageLogged");
