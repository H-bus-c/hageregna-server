/** @format */

const {
   models: { Zone },
} = require("../models");

exports.create = async (req, res) => {
   const data = await Zone.create(req.body);
   res.json({ data });
};

exports.findAll = async (req, res) => {
   await Zone.findAll()
      .then((data) => res.json(data))
      .catch((err) => console.log(err));
};

exports.findOne = async (req, res) => {
   const id = req.params.id;
   await Zone.findByPk(id)
      .then((data) => res.json(data))
      .catch((err) => res.json(err));
};

exports.update = async (req, res) => {
   const id = req.params.id;
   await Zone.update(req.body, { where: { Id: id } })
      .then((data) => res.json(data))
      .catch((err) => res.json(err));
};

exports.delete = async (req, res) => {
   const id = req.params.id;
   await Zone.destroy({ where: { Id: id } })
      .then((data) => res.json(data))
      .catch((err) => res.json(err));
};
