const { Router } = require("express");
const {
  postUser,
  getUserAll,
  getIdUser,
  putUser,
} = require("../handlers/userHandler");
const { userMiddleware } = require("../middlewares/userMiddleware");
const userRouter = Router();

userRouter.post("/", postUser);
userRouter.get("/", userMiddleware, getUserAll);
userRouter.get("/:idUser", getIdUser);
userRouter.put("/", putUser);

module.exports = userRouter;
