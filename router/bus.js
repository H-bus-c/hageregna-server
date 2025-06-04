const express = require("express");
const router = express.Router();
const bus = require("../controllers/bus");
module.exports = (app) => {
  router.get("/", bus.findAll);
  router.get("/read/:id", bus.findOne);
  router.post("/add", bus.create);
  router.put("/update/:id", bus.update);
  router.delete("/delete/:id", bus.delete);
  app.use("/bus", router);
};
