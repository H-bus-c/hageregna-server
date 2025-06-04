/** @format */

const {
  models: { City },
} = require("../models");

exports.create = async (req, res) => {
  const data = await City.create(req.body);
  res.json({ data });
};

exports.findAll = async (req, res) => {
  await City.findAll()
    .then((data) => res.json(data))
    .catch((err) => console.log(err));
};

exports.findOne = async (req, res) => {
  const id = req.params.id;
  await City.findByPk(id)
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
};

exports.update = async (req, res) => {
  const id = req.params.id;
  await City.update(req.body, { where: { Id: id } })
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
};

exports.delete = async (req, res) => {
  const id = req.params.id;
  await City.destroy({ where: { Id: id } })
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
};
