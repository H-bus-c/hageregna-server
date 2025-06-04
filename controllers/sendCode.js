// routes/sms.js or controller
const Redis = require("ioredis");
const redis = new Redis(); // assume you already configured redis client

exports.sendVerificationCode = async (req, res) => {
  const { phone } = req.body;
  if (!phone) return res.status(400).json({ message: "Phone number required" });
  const code = Math.floor(100000 + Math.random() * 900000); // 6-digit
  await redis.set(`verify:${phone}`, code.toString(), "EX", 60 * 10); // 30 mins
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
