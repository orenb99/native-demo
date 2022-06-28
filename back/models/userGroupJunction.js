"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserGroupJunction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.User, { foreignKey: "id", onDelete: "cascade" });
      this.hasMany(models.ChatGroup, { foreignKey: "id", onDelete: "cascade" });
    }
  }
  UserGroupJunction.init(
    {
      userId: DataTypes.INTEGER,
      groupId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "UserGroupJunction",
    }
  );
  return UserGroupJunction;
};
