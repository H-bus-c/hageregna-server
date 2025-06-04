const express = require("express");
const router = express.Router();
const userUpdateHistory = require("../controllers/userUpdateHistory");
module.exports = (app) => {
   router.get("/", userUpdateHistory.findAll);
   router.get("/read/:id", userUpdateHistory.findOne);
   router.post("/add", userUpdateHistory.create);
   router.put("/update/:id", userUpdateHistory.update);
   router.delete("/delete/:id", userUpdateHistory.delete);
   app.use("/user_update_history", router);
};
