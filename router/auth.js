const router = require("express").Router();
const auth = require("../controllers/auth");
module.exports = (app) => {
  router.post("/login", auth.login);
  router.post("/check", auth.check);
  router.get("/date",auth.date)
  app.use("/", router);
};
