'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserProfile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      UserProfile.belongsTo(models.User, {
        foreignKey: "userId",
        as: "user",
      });
    }
  }
  UserProfile.init({
    contactNo: {
      type: DataTypes.STRING
    },
    address: {
      type: DataTypes.TEXT
    },
    city: {
      type: DataTypes.STRING
    },
    profileImage: {
      type: DataTypes.TEXT
    },
    cnicNo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cnicPicture: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    isDeleted: {
      type: DataTypes
    }
    
  }, {
    sequelize,
    modelName: 'UserProfile',
  });
  return UserProfile;
};