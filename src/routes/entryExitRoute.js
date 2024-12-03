const { Router } = require("express");
const {
  postActivity,
  getActivityAll,
} = require("../handlers/entryExitHandler");
const entryExitRouter = Router();

entryExitRouter.get("/", getActivityAll);
entryExitRouter.post("/", postActivity);

module.exports = entryExitRouter;
