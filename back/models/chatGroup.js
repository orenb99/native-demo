"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ChatGroup extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.ChatMessage, { foreignKey: "groupId" });
      this.belongsToMany(models.User, {
        through: models.UserGroupJunction,
        foreignKey: "groupId",
      });
    }
  }
  ChatGroup.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "ChatGroup",
    }
  );
  return ChatGroup;
};
