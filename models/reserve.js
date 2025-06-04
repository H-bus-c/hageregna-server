const { STRING } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const Reserve = sequelize.define(
    "reserve",
    {
      Id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      scheduleDate: {
        type: DataTypes.DATE,
      },
      totalPrice: {
        type: DataTypes.FLOAT,
      },
      reservedBy: {
        type: DataTypes.JSONB,
      },
      payment: {
        type: DataTypes.JSONB,
      },
      busId: {
        type: DataTypes.STRING,
        allowNull: true,
      }
    },
    {
      timestamps: true,
    }
  );
  return Reserve;
};
