"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("applications", {
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
      radius: {
        type: Sequelize.DECIMAL,
      },
      instrument_id: {
        type: Sequelize.INTEGER,
        references: { model: "instruments", key: "id" },
        onDelete: "CASCADE",
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
    await queryInterface.dropTable("applications");
  },
};
