/** @format */

const {
  models: { BusType },
} = require("../models");

exports.create = async (req, res) => {
  const data = await BusType.create(req.body);
  res.json({ data });
};

exports.findAll = async (req, res) => {
  await BusType.findAll()
    .then((data) => res.json(data))
    .catch((err) => console.log(err));
};

exports.findOne = async (req, res) => {
  const id = req.params.id;
  await BusType.findByPk(id)
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
};

exports.update = async (req, res) => {
  const id = req.params.id;
  await BusType.update(req.body, { where: { Id: id } })
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
};

exports.delete = async (req, res) => {
  const id = req.params.id;
  await BusType.destroy({ where: { Id: id } })
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
};
