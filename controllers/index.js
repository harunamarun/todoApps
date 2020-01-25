const express = require("express");

const router = express.Router();

const todoRouter = require("./todo");

module.exports = models => {
  router.use("/todos", todoRouter(models));

  return router;
};
