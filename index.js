const config = require("./config");

const knex = require("knex")(config.db);
const models = require("./models")(knex);

const apiRouter = require("./controllers")(models);

const morgan = require("morgan"); // a popular library for logging your requests

const bodyParser = require("body-parser"); // a middleware plugin to enable express to parse JSON

// and of course, an express server =)
const express = require("express");

const app = express();

/**
 ********************************SERVER SETUP********************************
 ****************************************************************************
 */
// 1. log every request when it comes in
app.use(morgan("dev"));

// 3. Parse request bodies as json
app.use(bodyParser.json({ type: "application/json", limit: "50mb" }));

// 4. If the requests begin with '/api', hand them off to the API router
app.use("/api", apiRouter);

app.use((err, req, res, next) => {
  if (err.stack) {
    if (err.stack.match("node_modules/body-parser"))
      return res.status(400).send("Invalid JSON");
  }

  console.log(err);
  return res.status(500).send("Internal Error.");
});

/**
 ********************************START SERVER********************************
 ****************************************************************************
 */

app.listen(config.express.port, () => {
  console.log(`Server up and listening on port ${config.express.port}`);
});
