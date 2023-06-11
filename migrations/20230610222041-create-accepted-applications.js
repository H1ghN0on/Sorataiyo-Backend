"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("accepted_applications", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      application_id: {
        type: Sequelize.INTEGER,
        references: { model: "applications", key: "id" },
        allowNull: false,
      },
      session_id: {
        type: Sequelize.INTEGER,
        references: { model: "sessions", key: "id" },
        allowNull: false,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("accepted_applications");
  },
};
