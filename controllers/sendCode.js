// routes/sms.js or controller
require("dotenv").config({ path: `${process.cwd()}/.env` });
const Redis = require("ioredis");
const redis = new Redis(process.env.REDIS_URL, {
  tls: {}, // Required by Upstash to enable SSL
});
const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "haileiyesusyaregal@gmail.com",
    pass: "oeur hjab irns tuuc",
  },
});
exports.sendVerificationCode = async (req, res) => {
  const { phone } = req.body;
  if (!phone) return res.status(400).json({ message: "Phone number required" });
  const code = Math.floor(100000 + Math.random() * 900000); // 6-digit
  await redis.set(`verify:${phone}`, code.toString(), "EX", 60 * 10); // 30 mins
  await transporter.sendMail({
    from: "haileiyesusyaregal@gmail.com",
    to: `${body.email}`,
    subject: "SMS Verification",
    html: `<div ><center>
  <div><h4>Your Verification Cods </h4>
  <h1>${code}</h1>
  <br/>
  <br/>
  <br/>
  <p>This code wait for 10 min after that it will be expired!</p>
  </div>
  </center>
  </div>`,
  });
  res.json({ message: "Verification code sent" });
};

exports.verifySMSCode = async (req, res) => {
  const { phone, code } = req.body;
  if (!phone || !code) {
    return res
      .status(400)
      .json({ verify: false, message: "Phone and code are required" });
  }
  const savedCode = await redis.get(`verify:${phone}`);
  if (!savedCode) {
    return res
      .status(410)
      .json({ verify: false, message: "Code expired or not found" });
  }
  if (savedCode !== code) {
    return res.status(401).json({ verify: false, message: "Incorrect code" });
  }
  await redis.del(`verify:${phone}`);
  res.json({ verify: true, message: "Verification successful" });
};
