module.exports = (sequelize, DataTypes) => {
  const Payment = sequelize.define(
    "payment",
    {
      Id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      paymentMethod: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      transactionID: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },

    },
    {
      timestamps: true,
    }
  );
  return Payment;
};
