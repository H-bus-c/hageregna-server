const express = require("express");
const router = express.Router();
const zone = require("../controllers/zone");
module.exports = (app) => {
   router.get("/", zone.findAll);
   router.get("/read/:id", zone.findOne);
   router.post("/add", zone.create);
   router.put("/update/:id", zone.update);
   router.delete("/delete/:id", zone.delete);
   app.use("/zone", router);
};
