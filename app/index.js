const express = require("express");
require("dotenv").config();
const accessManeger = require("./middleware/access-manager");
const timeLogger = require("./middleware/time-stamp");
const auth = require("./auth");

const app = express();
const router = express.Router();
const modules = require("./modules");
const _ = require("lodash");

const use = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
/**
 * @returns {Express} app
 */
module.exports = () => {
  //Application Context, pass all app wise parameter, functions, constants in this context
  const ctx = {};

  for (i in modules) {
    if (!_.has(modules[i], "controllers")) throw new Error(`${i} does not contains controllers property`);
    if (!_.has(modules[i], "routes")) throw new Error(`${i} does not contains routes property`);

    const controllers = modules[i].controllers;
    const routes = modules[i].routes;
    for (j in routes) {
      const path = `/${i}${routes[j].path}`;
      const handler = routes[j].handler.split(".");
      if (!_.has(controllers, handler[0]))
        throw new Error(`'${i}' module does not have controller '${handler[0]}', in module ${i}`);
      if (!_.has(controllers[handler[0]](), handler[1]))
        throw new Error(`'${handler[0]}' controller does not have function '${handler[1]}', in module ${i}`);

      switch (routes[j].method) {
        case "GET": {
          console.log(`GET -> ${path}`);
          router.get(path, controllers[handler[0]](ctx)[handler[1]]);
          break;
        }
        case "POST": {
          console.log(`POST -> ${path}`);
          router.post(path, controllers[handler[0]](ctx)[handler[1]]);
          break;
        }
        case "PUT": {
          console.log(`PUT -> ${path}`);
          router.put(path, controllers[handler[0]](ctx)[handler[1]]);
          break;
        }
        case "DELETE": {
          console.log(`DELETE -> ${path}`);
          router.delete(path, controllers[handler[0]](ctx)[handler[1]]);
          break;
        }
        case "PATCH": {
          console.log(`PATCH -> ${path}`);
          router.patch(path, controllers[handler[0]](ctx)[handler[1]]);
          break;
        }
      }
    }
  }

  app.use((err, req, res, next) => {
    console.error(err.stack);
    console.error(err);
    res.status(500).json(err);
  });

  app.use(timeLogger);
  app.use(express.json());
  app.use("/app", accessManeger(ctx));
  app.use("/app", router);
  app.use("/auth", auth(ctx));
  return app;
};
