"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    // logic for transforming into the new state
    return queryInterface.addColumn("applications", "user_id", {
      type: Sequelize.INTEGER,
      references: { model: "users", key: "id" },
      allowNull: false,
    });
  },
};
