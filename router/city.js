const express = require("express");
const router = express.Router();
const city = require("../controllers/city");
module.exports = (app) => {
  router.get("/", city.findAll);
  router.get("/read/:id", city.findOne);
  router.post("/add", city.create);
  router.put("/update/:id", city.update);
  router.delete("/delete/:id", city.delete);
  app.use("/city", router);
};
