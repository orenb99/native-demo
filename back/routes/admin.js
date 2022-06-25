"use strict";
require("dotenv").config();

const express = require("express");
let admin = express.Router();
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

admin.get("/users", validateToken, async (req, res) => {
  const { user } = req;
  if (user.role !== "admin") return res.status(403).send("Access Denied");
  const users = await models.User.findAll({
    attributes: [
      "name",
      "role",
      [
        sequelize.fn(
          "DATE_FORMAT",
          sequelize.col("createdAt"),
          "%d/%m/%Y, %H:%i:%s"
        ),
        "joined",
      ],
    ],
  });
  if (!users) return res.status(400).send("No Users Found");
  return res.status(200).send(users);
});

module.exports = admin;
