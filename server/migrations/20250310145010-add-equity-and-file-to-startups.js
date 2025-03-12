'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Startups', 'equity', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.addColumn('Startups', 'projectFile', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize)  {
    await queryInterface.removeColumn('Startups', 'equity');
    await queryInterface.removeColumn('Startups', 'projectFile');
  }
};
