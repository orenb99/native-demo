"use strict";
const express = require("express");
let user = express.Router();
const models = require("../models");
const { Op } = require("sequelize");
const Sequelize = require("sequelize");
require("dotenv").config();
const sequelize = new Sequelize(
  process.env.SQL_DATA_BASE,
  process.env.SQL_USERNAME,
  process.env.SQL_PASSWORD,
  {
    host: process.env.SQL_HOST,
    dialect: "mysql",
  }
);

user.get("/create", (req, res) => {
  models.User.create({
    email: "oren",
    username: "oren",
    password: "pass",
    role: "admin",
  })
    .then(() => res.status(201).send("User created"))
    .catch((err) => res.status(400).send(err.message));
});

module.exports = user;
