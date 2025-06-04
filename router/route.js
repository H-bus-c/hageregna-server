const express = require("express");
const router = express.Router();
const route = require("../controllers/route");
module.exports = (app) => {
  router.get("/", route.findAll);
  router.get("/read/:id", route.findOne);
  router.post("/add", route.create);
  router.put("/update/:id", route.update);
  router.delete("/delete/:id", route.delete);
  app.use("/route", router);
};
