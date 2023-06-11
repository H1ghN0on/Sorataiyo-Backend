"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class AcceptedApplications extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  AcceptedApplications.init(
    {
      application_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "Applications", key: "id" },
      },
      session_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "Sessions", key: "id" },
      },
    },
    {
      sequelize,
      modelName: "AcceptedApplications",
      underscored: true,
    }
  );
  return AcceptedApplications;
};
