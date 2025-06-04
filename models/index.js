/** @format */
require("dotenv").config({ path: `${process.cwd()}/.env` });
const { Sequelize } = require("sequelize");
const sequelize = new Sequelize(process.env.DB_URL_E, {
   dialect: 'postgres',
   protocol: 'postgres',
   dialectOptions: {
      ssl: {
         require: true,
         rejectUnauthorized: false, // needed for Render
      },
   },
});

// sequelize
//    .authenticate()
//    .then(() => console.log('✅ Connected to PostgreSQL successfully'))
//    .catch(err => console.error('❌ Unable to connect to the database:', err));

const db = {};

db.sequelize = sequelize;
db.models = {};
db.models.Bus = require("./bus")(sequelize, Sequelize.DataTypes);
db.models.BusType = require("./busType")(sequelize, Sequelize.DataTypes);
db.models.BusUpdateHistory = require("./busUpdateHistory")(sequelize, Sequelize.DataTypes);
db.models.BusDepartureTime = require("./busDepartureTime")(sequelize, Sequelize.DataTypes)
db.models.City = require("./city")(sequelize, Sequelize.DataTypes);
db.models.Route = require("./route")(sequelize, Sequelize.DataTypes);
db.models.Region = require("./region")(sequelize, Sequelize.DataTypes)
db.models.Reserve = require("./reserve")(sequelize, Sequelize.DataTypes);
db.models.ReserveSeat = require("./reserveSeat")(
  sequelize,
  Sequelize.DataTypes
);
db.models.Role = require("./role")(sequelize, Sequelize.DataTypes);
db.models.Status = require("./status")(sequelize, Sequelize.DataTypes);
db.models.User = require("./user")(sequelize, Sequelize.DataTypes);
db.models.UserUpdateHistory = require("./userUpdateHistory")(sequelize, Sequelize.DataTypes);
db.models.Zone = require("./zone")(sequelize, Sequelize.DataTypes);

// Relation

db.models.Region.hasMany(db.models.Zone, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
db.models.Zone.belongsTo(db.models.Region, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
db.models.Zone.hasMany(db.models.City, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
db.models.City.belongsTo(db.models.Zone, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

db.models.Role.hasMany(db.models.User, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
db.models.User.belongsTo(db.models.Role, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

db.models.User.hasMany(db.models.BusType, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
db.models.BusType.belongsTo(db.models.User, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
db.models.User.hasMany(db.models.Bus, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
db.models.Bus.belongsTo(db.models.User, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
db.models.User.hasMany(db.models.UserUpdateHistory, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
db.models.UserUpdateHistory.belongsTo(db.models.User, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

db.models.Status.hasMany(db.models.BusType, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
db.models.BusType.belongsTo(db.models.Status, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
db.models.Bus.belongsTo(db.models.Route, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
db.models.Route.hasMany(db.models.Bus, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

db.models.Status.hasMany(db.models.Bus, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

db.models.Bus.belongsTo(db.models.Status, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
db.models.Status.hasMany(db.models.Reserve, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
db.models.Reserve.belongsTo(db.models.Status, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
db.models.Status.hasMany(db.models.ReserveSeat, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
db.models.ReserveSeat.belongsTo(db.models.Status, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
db.models.Status.hasMany(db.models.Route, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
db.models.Route.belongsTo(db.models.Status, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
db.models.Status.hasMany(db.models.BusDepartureTime, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
db.models.BusDepartureTime.belongsTo(db.models.Status, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
db.models.Status.hasMany(db.models.City, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
db.models.City.belongsTo(db.models.Status, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
db.models.Status.hasMany(db.models.Zone, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
db.models.Zone.belongsTo(db.models.Status, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
db.models.Status.hasMany(db.models.Region, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
db.models.Region.belongsTo(db.models.Status, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});


db.models.BusDepartureTime.hasMany(db.models.Reserve, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
db.models.Reserve.belongsTo(db.models.BusDepartureTime, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
db.models.Route.hasMany(db.models.BusDepartureTime, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
db.models.BusDepartureTime.belongsTo(db.models.Route, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
db.models.BusType.hasMany(db.models.BusDepartureTime, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
db.models.BusDepartureTime.belongsTo(db.models.BusType, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

db.models.BusType.hasMany(db.models.Bus, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
db.models.Bus.belongsTo(db.models.BusType, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

db.models.Reserve.hasMany(db.models.ReserveSeat, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
db.models.ReserveSeat.belongsTo(db.models.Reserve, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
db.models.Bus.hasMany(db.models.BusUpdateHistory, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
db.models.BusUpdateHistory.belongsTo(db.models.Bus, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});


module.exports = db;
