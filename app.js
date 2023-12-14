const Logger = require("./logger");
const logger = new Logger();

logger.on("logging", (eventArg) => {
  console.log("Logging Listener called", eventArg);
});

logger.log("message");
