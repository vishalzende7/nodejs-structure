"use strict";
const jwt = require("jsonwebtoken");

require("dotenv").config();
/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {async import("express").NextFunction} next
 */
module.exports = (ctx) => async (req, res, next) => {
  const { authorization } = req.headers;
  if (authorization == null) {
    res.status(500).json(new errors.ForbiddenError("Missing authorization token"));
    return;
  }

  try {
    const tokenData = jwt.verify(authorization.replace("Bearer ", ""), process.env.JWT_KEY);
    req.user = tokenData;
    //console.log(ctx.db.getEntityService('model'));
    //res.status(200).json(tokenData);
    next();
  } catch (e) {
    console.error(e.stackTrace());
    res.status(403).json(new Error("Invalid token"));
  }
};
