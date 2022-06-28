"use strict";
require("dotenv").config();

const express = require("express");
let chat = express.Router();
const models = require("../models");
const { Op } = require("sequelize");
const Sequelize = require("sequelize");
const { validateToken } = require("../utils");
const sequelize = new Sequelize(
  process.env.SQL_DATA_BASE,
  process.env.SQL_USERNAME,
  process.env.SQL_PASSWORD,
  {
    host: process.env.SQL_HOST,
    dialect: "mysql",
  }
);

chat.post("/create/group", (req, res) => {
  const { name } = req.body;
  models.ChatGroup.create({ name })
    .then(() => {
      res.status(201).send("Group Created");
    })
    .catch((err) => res.send(err.message));
});

chat.post("/create/message", (req, res) => {
  const { sender, content, groupId } = req.body;
  models.ChatGroup.findOne({ where: { id: groupId } })
    .then((group) => {
      group
        .createChatMessage({ sender, content })
        .then((message) => {
          return res.send(message);
        })
        .catch((err) => res.send(err));
    })
    .catch((err) => res.send(err));
  // models.ChatMessage.create({ sender, content, groupId })
  //   .then(() => {
  //     res.status(201).send("Message Created");
  //   })
  //   .catch((err) => res.send(err.message));
});

chat.post("/group/add", async (req, res) => {
  const { userId, groupId } = req.body;
  try {
    const user = await models.User.findOne({ where: { id: userId } });
    const group = await models.ChatGroup.findOne({ where: { id: groupId } });
    const success = await user.addChatGroup(group);
    if (!success) return res.status(400).send("User already in group");
    return res.send("User joined group");
  } catch (err) {
    return res.send(err.message);
  }
});

chat.get("/group/:groupId/messages", async (req, res) => {
  const { groupId } = req.params;
  models.ChatGroup.findOne({ where: { id: groupId } })
    .then(async (group) => {
      if (!group) return res.status(404).send("no group found");
      try {
        const messages = await group.getChatMessages();
        res.status(200).send(messages);
      } catch (err) {
        return res.send(err.message);
      }
    })
    .catch((err) => res.send(err));
});

module.exports = chat;
