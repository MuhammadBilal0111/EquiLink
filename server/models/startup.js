"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Startup extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Startup.belongsTo(models.User, {
        foreignKey: "entrepreneurId",
        as: "entrepreneur",
      });

      Startup.belongsTo(models.User, {
        foreignKey: "investorId",
        as: "investor",
      });

      Startup.belongsTo(models.Category, {
        foreignKey: "categoryId",
        as: "category",
      });
    }
  }
  Startup.init(
    {
      title: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      fundingGoal: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: false,
      },
      pitchVideo: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      pitchImages: {
        type: DataTypes.ARRAY(DataTypes.TEXT),
        allowNull: true,
      },
      proVersion: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },

      equity: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      projectFile: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Startup",
      tableName: "Startups",
      timestamps: true,
    }
  );
  return Startup;
};
