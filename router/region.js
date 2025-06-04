const express = require("express");
const router = express.Router();
const region = require("../controllers/region");
module.exports = (app) => {
   router.get("/", region.findAll);
   router.get("/read/:id", region.findOne);
   router.post("/add", region.create);
   router.put("/update/:id", region.update);
   router.delete("/delete/:id", region.delete);
   app.use("/region", router);
};
