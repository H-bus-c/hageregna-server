/** @format */

const {
  models: { Bus,BusType },
} = require("../models");

exports.create = async (req, res) => {
  const data = await Bus.create(req.body);
  res.json({ data });
};

exports.findAll = async (req, res) => {
  try {
    const buses = await Bus.findAll();
    const busTypes = await BusType.findAll();
    await Promise.all([buses, busTypes]);
    const data = buses.map(bus => {
      const busType = busTypes.find(busType => busType.Id === bus.busTypeId);
      let newBus = bus;
      newBus.admin = busType?.userId;
      return newBus;
    })
    res.json(data);
  } catch (error) {
    res.state(500).json({ error: error.message });
  }
  
   
};

exports.findOne = async (req, res) => {
  const id = req.params.id;
  await Bus.findByPk(id)
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
};

exports.update = async (req, res) => {
  const id = req.params.id;
  await Bus.update(req.body, { where: { Id: id } })
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
};

exports.delete = async (req, res) => {
  const id = req.params.id;
  await Bus.destroy({ where: { Id: id } })
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
};
