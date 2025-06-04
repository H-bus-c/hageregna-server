/** @format */

const {
  models: { Status },
} = require("../models");

exports.create = async (req, res) => {
  const data = await Status.create(req.body);
  res.json({ data });
};

exports.findAll = async (req, res) => {
  await Status.findAll()
    .then((data) => res.json(data))
    .catch((err) => console.log(err));
};

exports.findOne = async (req, res) => {
  const id = req.params.id;
  await Status.findByPk(id)
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
};

exports.update = async (req, res) => {
  const id = req.params.id;
  await Status.update(req.body, { where: { Id: id } })
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
};

exports.delete = async (req, res) => {
  const id = req.params.id;
  await Status.destroy({ where: { Id: id } })
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
};
