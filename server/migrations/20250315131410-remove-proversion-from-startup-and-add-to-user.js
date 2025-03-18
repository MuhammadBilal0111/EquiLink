'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Startups', 'proVersion', {
      type: Sequelize.BOOLEAN,
      allowNull: true,
    });

    await queryInterface.addColumn('Users', 'proVersion', {
      type: Sequelize.BOOLEAN,
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize)  {
    await queryInterface.addColumn('Startups', 'proVersion');
    await queryInterface.removeColumn('Users', 'proVersion');
  }
};
