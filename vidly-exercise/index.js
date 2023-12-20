const express = require("express");

const app = express();

// Built-in middleware
app.use(express.json());

app.use("/api/genres", require("./routes/genres"));
app.use("/", require("./routes/home"));

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
