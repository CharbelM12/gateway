const express = require("express");
const app = express();
const router = require("./src/routes/router");
const bodyParser = require("body-parser");
const errorMiddleware = require("./src/middleware/error.middleware");
const connect = require("./src/database/database");
const config = require("./src/configurations/config");
const corsMiddleware = require("./src/middleware/cors.middleware");

app.use(bodyParser.json());
app.use(corsMiddleware);
app.use("/api", router);
app.use(errorMiddleware);

app.listen(config.port, async () => {
  await connect();
});
