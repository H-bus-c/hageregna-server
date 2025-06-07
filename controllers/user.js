/** @format */
const {
  models: { User },
} = require("../models");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const saltRounds = 10;
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "haileiyesusyaregal@gmail.com",
    pass: "oeur hjab irns tuuc",
  },
});

exports.create = async (req, res) => {
  let body = req.body;
  body.isActive = true;
  body.emailConfirmed = false;
  body.securityStamp = Math.random().toString(36).substring(2, 15);
  body.phoneNumberConfirmed = false;
  body.twoFactorEnabled = false;
  body.lockOutEndDateUtc = null;
  body.lockoutEnabled = false;
  body.accessFailedCount = 0; // Change the security stamp
  body.roleId = -(-body.roleId);
  let passwordsHash = "" + Math.floor(1000 + Math.random() * 9000);
  bcrypt.hash(passwordsHash, saltRounds, async function (err, hash) {
    body.passwordHash = hash;
    if (err) return res.json(err);
    await transporter.sendMail({
      from: "haileiyesusyaregal@gmail.com",
      to: `${body.email}`,
      subject: "New Password",
      html: `<div ><center>
    <div><h4>This is your password </h4>
    <h3>${passwordsHash}</h3></div>
    </center>
    </div>`,
    });
    const data = await User.create(body);

    res.json({ data, message: "Data Insert Successfully" });
  });
};
exports.findAll = async (req, res) => {
  await User.findAll()
    .then((data) => res.json(data))
    .catch((err) => console.log(err));
};
exports.findOne = async (req, res) => {
  const id = req.params.id;
  await User.findByPk(id)
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
};
exports.update = async (req, res) => {
  const id = req.params.id;
  let { check } = req.body;
  let passwordsHash = "" + Math.floor(1000 + Math.random() * 9000);
  if (check === 1) {
    //email verification to update verify
    await User.findByPk(id).then(async (user) => {
      await transporter.sendMail({
        from: "haileiyesusyaregal@gmail.com",
        to: `${user.email}`,
        subject: "Email Verification",
        html: `<div ><center>
      <div><h4>Your Verification Code</h4>
      <h3>${passwordsHash}</h3></div>
      </center>
      </div>`,
      });
      return res.json({ verify: passwordsHash });
    });
  } else if (check === 2) {
    //reset password to update password
    let { passwordHash } = req.body;
    bcrypt.hash(passwordHash, saltRounds, async function (err, hash) {
      if (err) return res.json({ message: err });
      passwordHash = hash;
      await User.update({ passwordHash }, { where: { Id: id } })
        .then((data) => res.json(data))
        .catch((err) => res.json(err));
    });
  } else if (check === 3) {
    //forget password
    let { email } = req.body;
    await User.findOne({ where: { email: email } }).then(async (user) => {
      if (user) {
        if (!(user.emailConfirmed)) {
          return res.json(0);
        }
        let message = {
          from: "haileiyesusyaregal@gmail.com",
          to: `${user.email}`,
          subject: "Reset Password",
          html: `<div><h4>Your New Password</h4>
      <h3>${passwordsHash}</h3></div>`,
        };
        transporter.sendMail(message, (err, info) => {
          if (err) return res.json({ message: err });
          bcrypt.hash(passwordsHash, saltRounds, async (err, hash) => {
            if (err) return res.json({ message: err });
            passwordsHash = hash;
            user.passwordHash = passwordsHash;
            await user.save();
            return res.json(1);
          });
        });
      } else {
        res.json(2);
      }
    });
  } else if (check === 4) {
    //update user email and emailConfirmed
    let { email, emailConfirmed } = req.body;
    await User.update({ email, emailConfirmed }, { where: { Id: id } })
      .then((data) => res.json(data))
      .catch((err) => res.json(err));
  } else {
    await User.update(req.body, { where: { Id: id } })
      .then((data) => res.json(data))
      .catch((err) => res.json(err));
  }
};

exports.delete = async (req, res) => {
  const id = req.params.id;
  await User.destroy({ where: { Id: id } })
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
};
