/** @format */

const {
  models: { ReserveSeat },
} = require("../models");

async function generateAdvancedTicket() {
  const { customAlphabet } = await import("nanoid");
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const nanoid = customAlphabet(alphabet, 6); // nanoid will generate 6 characters

  // 1. Date part (base36, uppercase, 6 chars)
  const datePart = Date.now().toString(36).toUpperCase().slice(-6); // Take last 6 chars to make sure
  // 2. Random part (6 chars)
  const randomPart = nanoid(); // Already 6 chars
  // 3. Combine
  return datePart + randomPart; // 6 + 6 = 12 characters
}

exports.create = async (req, res) => {
  let body = req.body;
  body.ticketNumber =await generateAdvancedTicket().then(ticket=>ticket);
  const data = await ReserveSeat.create(body);
  res.json({ data });
};

exports.findAll = async (req, res) => {
  await ReserveSeat.findAll({
    order: [["seatNumber", "ASC"]], // ASC for ascending, DESC for descending
  })
    .then((data) => res.json(data))
    .catch((err) => console.log(err));
};

exports.findOne = async (req, res) => {
  const id = req.params.id;
  await ReserveSeat.findByPk(id)
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
};

exports.update = async (req, res) => {
  const id = req.params.id;
  await ReserveSeat.update(req.body, { where: { Id: id } })
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
};

exports.delete = async (req, res) => {
  const id = req.params.id;
  await ReserveSeat.destroy({ where: { Id: id } })
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
};
