module.exports = (sequelize, DataTypes) => {
   const BusUpdateHistory = sequelize.define(
      "busUpdateHistory",
      {
         Id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
         },
         changeType: {
            type: DataTypes.JSONB, // Store JSON data
            defaultValue: {}
         },
         date: {
            type: DataTypes.DATE,
            default: new Date(),
         }
      },
      {
         timestamps: false,
      }
   );
   return BusUpdateHistory;
};
