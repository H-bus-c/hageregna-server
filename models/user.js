module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "user",
    {
      Id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      fullName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      userName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false
      },
      emailConfirmed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      passwordHash: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      securityStamp: {
        type: DataTypes.STRING,
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
      },
      phoneNumberConfirmed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      twoFactorEnabled: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      lockOutEndDateUtc: {
        type: DataTypes.DATE,
        defaultValue: null,
      },
      lockoutEnabled: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      accessFailedCount: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      workPlace: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
      admin: {
        type: DataTypes.STRING,
        defaultValue: "0",
      },

    },
    {
      timestamps: true,
    }
  );
  return User;
};
