const express = require("express");
const router = express.Router();
const role = require("../controllers/role");
module.exports = (app) => {
  router.get("/", role.findAll);
  app.use("/role", router);
};
