"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.renameColumn("Startups", "statue", "status");
  },

  async down(queryInterface, Sequelize)  {
    await queryInterface.renameColumn("Startups", "status", "statue");
  },
};
