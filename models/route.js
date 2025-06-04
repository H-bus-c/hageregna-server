module.exports = (sequelize, DataTypes) => {
   const Route = sequelize.define(
      "route",
      {
         Id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
         },
         city1: {
            type: DataTypes.STRING(100),
            allowNull: false
         },
         city2: {
            type: DataTypes.STRING(100),
            allowNull: false
         },
         distance: {
            type: DataTypes.DECIMAL(8, 2),
            allowNull: false,
            validate: {
               min: 0.01
            }
         },
         duration: {
            type: DataTypes.TIME,
            allowNull: false
         },
         

      },
      {
         timestamps: true,
      });
   return Route;
};
