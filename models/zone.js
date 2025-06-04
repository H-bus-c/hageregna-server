module.exports = (sequelize, DataTypes) => {
   const Zone = sequelize.define(
      "zone",
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
   return Zone;
};
