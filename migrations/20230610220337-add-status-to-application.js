"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    // logic for transforming into the new state
    return queryInterface.addColumn(
      "Applications",
      "status",
      Sequelize.ENUM("rejected", "accepted", "completed", "pending")
    );
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.removeColumn("Applications", "status");
  },
};
