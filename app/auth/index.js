"use strict";

const express = require("express");
const { ApplicationError } = require("../../utils/error");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const router = express.Router();

module.exports = (ctx) => {
  router.post("/login", async (req, res) => {
    const { user, pwd } = req.body;

    if (user == null || user.trim().length == 0) {
      res.status(400).json(new ApplicationError("Missing 'user' in body"));
      return;
    }

    if (pwd == null || pwd.trim().length == 0) {
      res.status(400).json(new ApplicationError("Missing 'pwd' in body"));
      return;
    }

    const token = jwt.sign(req.body, process.env.JWT_KEY);
    res.status(200).json({ status: true, access_token: token });
  });

  router.post("/license", async (req, res) => {
    res.status(200).json({ status: true, access_token: "token" });
  });

  return router;
};