"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.changeColumn("Applications", "status", Sequelize.STRING);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.changeColumn(
      "Applications",
      "status",
      Sequelize.ENUM("rejected", "accepted", "completed", "pending")
    );
  },
};
