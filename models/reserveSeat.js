module.exports = (sequelize, DataTypes) => {
  const ReserveSeat = sequelize.define(
    "reserveSeat",
    {
      Id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      customerName: {
        type: DataTypes.STRING,
      },
      customerPhone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      ticketNumber: {
        type: DataTypes.STRING,
      },
      seatNumber: {
        type: DataTypes.INTEGER,
      },

    },
    {
      timestamps: true,
    }
  );
  return ReserveSeat;
};
