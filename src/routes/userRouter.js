const { Router } = require("express");
const {
  postUser,
  getUserAll,
  getIdUser,
  putUser,
} = require("../handlers/userHandler");
const userRouter = Router();

userRouter.post("/", postUser);
userRouter.get("/", getUserAll);
userRouter.get("/:idUser", getIdUser);
userRouter.put("/", putUser);

module.exports = userRouter;
