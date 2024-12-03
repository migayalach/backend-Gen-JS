const { Router } = require("express");
const {
  postActivity,
  getActivityAll,
} = require("../handlers/entryExitHandler");
const extryExitRouter = Router();

extryExitRouter.get("/", getActivityAll);
extryExitRouter.post("/", postActivity);

module.exports = extryExitRouter;
