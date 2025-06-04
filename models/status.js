module.exports = (sequelize, DataTypes) => {
  const Status = sequelize.define(
    "status",
    {
      Id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },

    },
    {
      timestamps: true,
    }
  );
  return Status;
};
