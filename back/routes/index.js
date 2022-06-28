"use strict";
const { Router } = require("express");
const user = require("./user");
const admin = require("./admin");
const chat = require("./chat");

const api = Router();

api.use("/user", user);
api.use("/admin", admin);
api.use("/chat", chat);

module.exports = api;
