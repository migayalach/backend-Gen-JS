const { Router } = require("express");
const { postUser, getUserAll, putUser } = require("../handlers/userHandler");
const userRouter = Router();

userRouter.post("/", postUser);
userRouter.get("/", getUserAll);
userRouter.put("/", putUser);

module.exports = userRouter;
