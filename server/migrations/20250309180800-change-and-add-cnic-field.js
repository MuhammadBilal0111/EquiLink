"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.renameColumn(
      "UserProfiles",
      "cnicPicture",
      "cnicFrontImage"
    );
    await queryInterface.addColumn("UserProfiles", "cnicBackImage", {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.renameColumn(
      "UserProfiles",
      "cnicPicture",
      "cnicFrontImage"
    );
    await queryInterface.removeColumn("UserProfiles", "cnicBackImage");
  },
};
