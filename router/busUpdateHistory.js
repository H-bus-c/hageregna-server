const express = require("express");
const router = express.Router();
const busUpdateHistory = require("../controllers/busUpdateHistory");
module.exports = (app) => {
   router.get("/", busUpdateHistory.findAll);
   router.get("/read/:id", busUpdateHistory.findOne);
   router.post("/add", busUpdateHistory.create);
   router.put("/update/:id", busUpdateHistory.update);
   router.delete("/delete/:id", busUpdateHistory.delete);
   app.use("/bus_update_history", router);
};
