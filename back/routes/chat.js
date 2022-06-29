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
  if (!name) return res.status(400).send("no name entered");
  const nameReg = /[a-zA-Z0-9]$/;
  if (!name.match(nameReg)) return res.status(400).send("invalid name");
  models.ChatGroup.create({ name })
    .then(() => {
      res.status(201).send("Group Created");
    })
    .catch((err) => res.send(err.message));
});

chat.post("/create/message", async (req, res) => {
  const { sender, content, groupId } = req.body;
  if (!sender || !content || !groupId)
    return res.status(400).send("Couldn't send message");
  try {
    const group = await models.ChatGroup.findOne({
      where: { id: groupId },
      include: [{ model: models.User, where: { id: sender } }],
    });
    if (!group) return res.status(404).send("Group not found");
    const user = group.Users[0];
    if (!user) return res.status(400).send("Couldn't send message");
    const message = await group.createChatMessage({ sender, content });
    return res.send(message);
  } catch (err) {
    return res.send(err);
  }
});

chat.post("/group/add", async (req, res) => {
  const { userId, groupId } = req.body;
  if (!sender || !content || !groupId)
    return res.status(400).send("Couldn't add user");
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

chat.get("/group/:groupId/messages", validateToken, async (req, res) => {
  const { id } = req.user;
  const { groupId } = req.params;
  try {
    const group = await models.ChatGroup.findOne({
      where: { id: groupId },
      include: [
        { model: models.User, where: { id }, attributes: ["name", "id"] },
      ],
    });
    const users = group.Users.map((item) => {
      return { name: item.name, id: item.id };
    });
    if (!users.map((user) => user.id).includes(id))
      return res.send("Can't send message");
    if (!group) return res.status(404).send("no group found");
    const messages = await group.getChatMessages();
    res.status(200).send({ users, name: group.name, messages });
  } catch (err) {
    return res.send(err.message);
  }
});

chat.get("/group/list", validateToken, async (req, res) => {
  const { id } = req.user;
  try {
    const user = await models.User.findOne({ where: { id } });
    if (!user) return res.status(404).send("user not found");
    const groups = await user.getChatGroups();
    return res.send(groups);
  } catch (err) {
    return res.send(err.message);
  }
});

module.exports = chat;
