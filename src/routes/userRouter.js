const { Router } = require("express");
const { postUser, getUserAll } = require("../handlers/userHandler");
const userRouter = Router();

userRouter.post("/", postUser);
userRouter.get("/", getUserAll);

module.exports = userRouter;
