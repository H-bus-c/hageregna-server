module.exports = (sequelize, DataTypes) => {
   const BusDepartureTime = sequelize.define(
      "busDepartureTime",
      {
         Id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
         },
         departureTime: {
            type: DataTypes.JSONB,

         },
         basePrice: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: true,
            validate: {
               min: 100
            }
         },
      },
      {
         timestamps: true,
      }
   );
   return BusDepartureTime;
};
