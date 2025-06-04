const express = require("express");
const router = express.Router();
const busDepartureTime = require("../controllers/busDepartureTime");
module.exports = (app) => {
   router.get("/", busDepartureTime.findAll);
   router.get("/read/:id", busDepartureTime.findOne);
   router.post("/add", busDepartureTime.create);
   router.put("/update/:id", busDepartureTime.update);
   router.delete("/delete/:id", busDepartureTime.delete);
   app.use("/bus_departure_time", router);
};
