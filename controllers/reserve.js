/** @format */

const {
  models: { Reserve,BusDepartureTime },
} = require("../models");

exports.create = async (req, res) => {
  const data = await Reserve.create(req.body);
  res.json({ data });
};

exports.findAll = async (req, res) => {
  try {
    const reserves = await Reserve.findAll({
      order: [['scheduleDate', 'DESC']] // ASC for ascending, DESC for descending
    });
    const busDepartureTimes = await BusDepartureTime.findAll();
    await Promise.all([reserves, busDepartureTimes]);
    const data = reserves.map(reserve => {
      const busDepartureTime = busDepartureTimes.find(b => b.Id === reserve.busDepartureTimeId);
      return {
        Id:reserve?.Id,
        scheduleDate:reserve?.scheduleDate,
        totalPrice:reserve?.totalPrice,
        reservedBy:reserve?.reservedBy,
        payment:reserve?.payment ,
        busId:reserve?.busId,
        createdAt:reserve?.createdAt,
        updatedAt:reserve?.updatedAt,
        statusId:reserve?.statusId ,
        busDepartureTimeId:reserve?.busDepartureTimeId ,
        busTypeId:busDepartureTime?.busTypeId,
      };
    });
   
    res.json(data);
  } catch (error) {
    res.state(500).json({error:error.message})
  }
  
   
};
exports.findOne = async (req, res) => {
  const id = req.params.id;
  await Reserve.findByPk(id)
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
};

exports.update = async (req, res) => {
  const id = req.params.id;
  await Reserve.update(req.body, { where: { Id: id } })
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
};

exports.delete = async (req, res) => {
  const id = req.params.id;
  await Reserve.destroy({ where: { Id: id } })
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
};
