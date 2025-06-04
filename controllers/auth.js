const {
  models: { User },
} = require("../models");
require("dotenv").config({ path: `${process.cwd()}/.env` });
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const role = ["/user", "/user", "/user", "/", "/passenger_check_list"];
exports.login = async (req, res) => {
  let { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email: email } });
    if (!user || !user.isActive) {
      return res.json({
        Login: false,
        error: "Invalid Email or account is inactive.",
      });
    }
    if (user.lockoutEnabled && user.lockOutEndDateUtc > new Date()) {
      return res.json({
        Login: false,
        error: "Account locked. Please try again later.",
      });
    }
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      await User.update(
        { accessFailedCount: user.accessFailedCount + 1 },
        { where: { Id: user.Id } }
      );
      if (user.accessFailedCount + 1 >= 5) {
        // Lock the account after 5 failed attempts
        await User.update(
          {
            lockoutEnabled: true,
            lockOutEndDateUtc: new Date(Date.now() + 15 * 60 * 1000),
            accessFailedCount: 0,
          },
          { where: { Id: user.Id } }
        ); // 15 minutes lockout
        return res.json({ Login: false, error: "Invalid password." });
      }
      return res.json({ Login: false, error: "Invalid password." });
    }
    await User.update({ accessFailedCount: 0 }, { where: { Id: user.Id } });
    // Generate JWT token
    const token = jwt.sign(
      {
        Id: user.Id,
        roleId: user.roleId,
        admin: user.roleId === 2 ? user.Id : user.admin,
        workPlace: user.workPlace,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" } // Token expires after 1 hour
    );
    res.json({
      token,
      message: "Login successful",
      Login: true,
      path: role[user.roleId - 1],
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.check = async (req, res) => {
  let { id, password } = req.body;
  try {
    const data = await User.findOne({ where: { Id: id } });
    if (data) {
      const isPasswordValid = await bcrypt.compare(password, data.passwordHash);
      if (!isPasswordValid) return res.json({ Login: false });
      return res.json({
        Login: true,
      });
    } else {
      return res.json({ Login: false });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.date = (req, res) => {
  res.json({ serverDate: new Date().toISOString() });
}


// exports.validateCredentials = async (req, res) => {
//   let { userName, password } = req.body;
//   try {
//     const user = await User.findOne({ where: { userName: userName } });
//     if (!user) {
//       return res.json({ valid: false, message: "Invalid Username." });
//     }
//     const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
//     if (!isPasswordValid) {
//       return res.json({ valid: false, message: "Invalid Password." });
//     }
//     res.json({ valid: true, message: "Credentials are valid." });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };
