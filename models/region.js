module.exports = (sequelize, DataTypes) => {
   const Region = sequelize.define(
      "region",
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
   return Region;
};
