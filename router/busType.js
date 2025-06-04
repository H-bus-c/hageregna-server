const express = require("express");
const router = express.Router();
const busType = require("../controllers/busType");
module.exports = (app) => {
  router.get("/", busType.findAll);
  router.get("/read/:id", busType.findOne);
  router.post("/add", busType.create);
  router.put("/update/:id", busType.update);
  router.delete("/delete/:id", busType.delete);
  app.use("/bus_type", router);
};
