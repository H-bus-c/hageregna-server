/** @format */

const {
  models: { Role },
} = require("../models");

exports.create = async (req, res) => {
  const data = await Role.create(req.body);
  res.json({ data });
};

exports.findAll = async (req, res) => {
  await Role.findAll()
    .then((data) => res.json(data))
    .catch((err) => console.log(err));
};

exports.findOne = async (req, res) => {
  const id = req.params.id;
  await Role.findByPk(id)
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
};

exports.update = async (req, res) => {
  const id = req.params.id;
  await Role.update(req.body, { where: { Id: id } })
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
};

exports.delete = async (req, res) => {
  const id = req.params.id;
  await Role.destroy({ where: { Id: id } })
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
};
