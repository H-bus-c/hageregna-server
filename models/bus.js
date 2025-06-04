module.exports = (sequelize, DataTypes) => {
  const Bus = sequelize.define(
    "bus",
    {
      Id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      licensePlate: {
        type: DataTypes.STRING(20),
        allowNull: false
      },
      capacity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 1
        }
      },
    },
    {
      timestamps: true,
    }
  );
  return Bus;
};
