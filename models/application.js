"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Application extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Application.belongsTo(models.Instrument, { foreignKey: "instrument_id" });
      Application.belongsTo(models.User, { foreignKey: "user_id" });
    }
  }
  Application.init(
    {
      x: DataTypes.DECIMAL,
      y: DataTypes.DECIMAL,
      radius: DataTypes.DECIMAL,
      instrument_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "Instruments", key: "id" },
      },
      status: DataTypes.STRING,
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "Users", key: "id" },
      },
      name: DataTypes.STRING,
      review: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Application",
      underscored: true,
    }
  );
  return Application;
};
