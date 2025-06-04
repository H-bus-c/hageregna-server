const express = require("express");
const router = express.Router();
const status = require("../controllers/status");
module.exports = (app) => {
  router.get("/", status.findAll);
  app.use("/status", router);
};
