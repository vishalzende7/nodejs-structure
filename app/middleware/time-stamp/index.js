"use strict";

/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {async import("express").NextFunction} next
 */
module.exports = async (req, res, next) => {
  console.time('request-time');
  await next();
  console.timeEnd('request-time');
};
