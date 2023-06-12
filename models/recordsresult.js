"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class RecordsResult extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      RecordsResult.belongsTo(models.Session);
    }
  }
  RecordsResult.init(
    {
      x: DataTypes.DECIMAL,
      y: DataTypes.DECIMAL,
      direction_cos_orientation1: DataTypes.DECIMAL,
      direction_cos_orientation2: DataTypes.DECIMAL,
      direction_cos_orientation3: DataTypes.DECIMAL,
      center_latitude: DataTypes.DECIMAL,
      center_longitude: DataTypes.DECIMAL,
      data: DataTypes.STRING,
      control_info: DataTypes.STRING,
      session_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "Session", key: "id" },
      },
    },
    {
      sequelize,
      modelName: "RecordsResult",
      underscored: true,
    }
  );
  return RecordsResult;
};
