const express = require("express");
const router = express.Router();
const sendCode = require("../controllers/sendCode");
module.exports = (app) => {
  router.post("/sms", sendCode.sendVerificationCode);
   router.post("/sms_verify",sendCode.verifySMSCode)
  app.use("/verification_code", router);
};
