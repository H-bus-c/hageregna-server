/** @format */

const {
   models: { Region },
} = require("../models");

exports.create = async (req, res) => {
   const data = await Region.create(req.body);
   res.json({ data });
};

exports.findAll = async (req, res) => {
   await Region.findAll()
      .then((data) => res.json(data))
      .catch((err) => console.log(err));
};

exports.findOne = async (req, res) => {
   const id = req.params.id;
   await Region.findByPk(id)
      .then((data) => res.json(data))
      .catch((err) => res.json(err));
};

exports.update = async (req, res) => {
   const id = req.params.id;
   await Region.update(req.body, { where: { Id: id } })
      .then((data) => res.json(data))
      .catch((err) => res.json(err));
};

exports.delete = async (req, res) => {
   const id = req.params.id;
   await Region.destroy({ where: { Id: id } })
      .then((data) => res.json(data))
      .catch((err) => res.json(err));
};
