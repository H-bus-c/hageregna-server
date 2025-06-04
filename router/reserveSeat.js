const express = require("express");
const router = express.Router();
const reserveSeat = require("../controllers/reserveSeat");
module.exports = (app) => {
  router.get("/", reserveSeat.findAll);
  router.get("/read/:id", reserveSeat.findOne);
  router.post("/add", reserveSeat.create);
  router.put("/update/:id", reserveSeat.update);
  router.delete("/delete/:id", reserveSeat.delete);
  app.use("/reserve_seat", router);
};
