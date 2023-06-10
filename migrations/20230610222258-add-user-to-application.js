"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    // logic for transforming into the new state
    return queryInterface.addColumn("Applications", "user_id", {
      type: Sequelize.INTEGER,
      references: { model: "Users", key: "id" },
      allowNull: false,
    });
  },
};
