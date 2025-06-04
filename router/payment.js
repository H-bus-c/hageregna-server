const express = require("express");
const router = express.Router();
const payment = require("../controllers/payment");
module.exports = (app) => {
  router.get("/", payment.findAll);
  router.get("/read/:id", payment.findOne);
  router.post("/add", payment.create);
  router.put("/update/:id", payment.update);
  router.delete("/delete/:id", payment.delete);
  app.use("/payment", router);
};
