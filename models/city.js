module.exports = (sequelize, DataTypes) => {
  const City = sequelize.define(
    "city",
    {
      Id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },

    },
    {
      timestamps: true,
    }
  );
  return City;
};
