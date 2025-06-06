"use strict";
require("dotenv").config();

const express = require("express");
const user = express.Router();
const models = require("../models");
const { Op } = require("sequelize");
const Sequelize = require("sequelize");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { checkInput, generateAccessToken, validateToken } = require("../utils");
const sequelize = new Sequelize(
  process.env.SQL_DATA_BASE,
  process.env.SQL_USERNAME,
  process.env.SQL_PASSWORD,
  {
    host: process.env.SQL_HOST,
    dialect: "mysql",
  }
);
user.post("/login", checkInput, async (req, res) => {
  const { email, password } = req.body;
  const user = await models.User.findOne({ where: { email } });
  if (!user) return res.status(404).send("User doesn't exists");
  const isPasswordCorrect = bcrypt.compareSync(password, user.password);
  if (!isPasswordCorrect) return res.status(401).send("Incorrect password");
  const loginUser = { id: user.id, email, name: user.name, role: user.role };
  const accessToken = generateAccessToken(loginUser);
  const refreshToken = jwt.sign(loginUser, process.env.REFRESH_TOKEN_SECRET);
  models.Token.create({ token: refreshToken })
    .then(() => {
      res.send({ accessToken, refreshToken });
    })
    .catch((err) => {
      res.status(err.status).send(err.message);
    });
});

user.post("/token", (req, res) => {
  console.log("yes");
  const refreshToken = req.body.token;
  console.log(refreshToken);
  if (refreshToken == null) return res.sendStatus(401);
  models.Token.findOne({ where: { token: refreshToken } })
    .then((token) => {
      if (!token) return res.sendStatus(403);
      jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, user) => {
          if (err) return res.sendStatus(403);
          const accessToken = generateAccessToken({
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
          });
          return res.send(accessToken);
        }
      );
    })
    .catch(() => {
      return res.sendStatus(400);
    });
});

user.delete("/logout", (req, res) => {
  const refreshToken = req.body.token;
  models.Token.destroy({ where: { token: refreshToken } })
    .then(() => {
      return res.status(204);
    })
    .catch((err) => {
      return res.send(err);
    });
});

user.post("/register", checkInput, async (req, res) => {
  const { name, email, password } = req.body;
  if (!name) return res.status(400).send("name missing");

  const exists = await models.User.findOne({ where: { email } });
  if (exists) return res.status(409).send("User exists");

  const newPassword = await bcrypt.hash(password, bcrypt.genSaltSync(10));
  models.User.create({
    email,
    name,
    password: newPassword,
    role: "user",
  })
    .then(() => res.status(201).send("User created"))
    .catch((err) => res.status(400).send(err.message));
});

user.get("/info", validateToken, async (req, res) => {
  const { user } = req;
  res.send(user);
});
module.exports = user;
