'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Startups', 'contractProjectId', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn('Startups', 'walletAddress', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn('Startups', 'statue', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  async down (queryInterface, Sequelize)  {
    await queryInterface.removeColumn('Startups', 'contractProjectId');
    await queryInterface.removeColumn('Startups', 'walletAddress');
    await queryInterface.removeColumn('Startups', 'statue');
  }
};
