"use strict";
const { Router } = require("express");
const user = require("./user");
const admin = require("./admin");

const api = Router();

api.use("/user", user);
api.use("/admin", admin);

module.exports = api;
