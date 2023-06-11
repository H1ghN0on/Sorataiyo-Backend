"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("records_results", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      x: {
        type: Sequelize.DECIMAL,
      },
      y: {
        type: Sequelize.DECIMAL,
      },
      direction_cos_orientation1: {
        type: Sequelize.DECIMAL,
      },
      direction_cos_orientation2: {
        type: Sequelize.DECIMAL,
      },
      direction_cos_orientation3: {
        type: Sequelize.DECIMAL,
      },
      center_latitude: {
        type: Sequelize.DECIMAL,
      },
      center_longitude: {
        type: Sequelize.DECIMAL,
      },
      data: {
        type: Sequelize.STRING,
      },
      control_info: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable("records_results");
  },
};
