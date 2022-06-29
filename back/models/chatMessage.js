"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ChatMessage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.ChatGroup, {
        foreignKey: "id",
        onDelete: "cascade",
      });
    }
  }
  ChatMessage.init(
    {
      sender: DataTypes.INTEGER,
      content: DataTypes.STRING,
      groupId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "ChatMessage",
    }
  );
  return ChatMessage;
};
