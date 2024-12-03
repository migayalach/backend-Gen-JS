const { Router } = require("express");
const mainRouter = Router();

// ROUTES
const entryExitRouter = require("./entryExitRoute");
const loginRouter = require("./loginRoute");
const productRouter = require("./productRoute");
const userRouter = require("./userRouter");

// ENTRY POINT'S
mainRouter.use("/entryExit", entryExitRouter);
mainRouter.use("/login", loginRouter);
mainRouter.use("/product", productRouter);
mainRouter.use("/user", userRouter);

module.exports = mainRouter;
