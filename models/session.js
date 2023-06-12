"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Session extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Session.hasMany(models.RecordsResult);
      Session.belongsTo(models.Application, { foreignKey: "application_id" });
    }
  }
  Session.init(
    {
      startTimestamp: DataTypes.DATE,
      endTimestamp: DataTypes.DATE,
      applicationId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "Applications", key: "id" },
      },
    },
    {
      sequelize,
      modelName: "Session",
      underscored: true,
    }
  );
  return Session;
};
