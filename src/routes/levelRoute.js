const { Router } = require("express");
const { getLevelAll } = require("../handlers/levelHandler");

const levelRouter = Router();

levelRouter.get("/", getLevelAll);

module.exports = levelRouter;
