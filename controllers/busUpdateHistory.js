/** @format */

const {
   models: { BusUpdateHistory },
} = require("../models");

exports.create = async (req, res) => {
   req.body.date = new Date();
   const data = await BusUpdateHistory.create(req.body);
   res.json({ data });
};

exports.findAll = async (req, res) => {
   await BusUpdateHistory.findAll()
      .then((data) => res.json(data))
      .catch((err) => console.log(err));
};

exports.findOne = async (req, res) => {
   const id = req.params.id;
   await BusUpdateHistory.findByPk(id)
      .then((data) => res.json(data))
      .catch((err) => res.json(err));
};

exports.update = async (req, res) => {
   const id = req.params.id;
   await BusUpdateHistory.update(req.body, { where: { Id: id } })
      .then((data) => res.json(data))
      .catch((err) => res.json(err));
};

exports.delete = async (req, res) => {
   const id = req.params.id;
   await BusUpdateHistory.destroy({ where: { Id: id } })
      .then((data) => res.json(data))
      .catch((err) => res.json(err));
};
