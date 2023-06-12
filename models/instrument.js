"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Instrument extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Instrument.hasMany(models.Application);
    }
  }
  Instrument.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Instrument",
      underscored: true,
    }
  );

  return Instrument;
};
