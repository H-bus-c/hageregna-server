const express = require("express");
const router = express.Router();
const reserve = require("../controllers/reserve");
module.exports = (app) => {
  router.get("/", reserve.findAll);
  router.get("/read/:id", reserve.findOne);
  router.post("/add", reserve.create);
  router.put("/update/:id", reserve.update);
  router.delete("/delete/:id", reserve.delete);
  app.use("/reserve", router);
};
