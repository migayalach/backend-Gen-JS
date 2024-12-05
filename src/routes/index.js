const { Router } = require("express");
const mainRouter = Router();

// ROUTES
const entryExitRouter = require("./entryExitRoute");
const loginRouter = require("./loginRoute");
const productRouter = require("./productRoute");
const userRouter = require("./userRouter");
const auditProductRouter = require("./productAuditRoute");
const levelRouter = require("./levelRoute");

// ENTRY POINT'S
mainRouter.use("/user", userRouter);
mainRouter.use("/login", loginRouter);
mainRouter.use("/entryExit", entryExitRouter);
mainRouter.use("/product", productRouter);
mainRouter.use("/auditProduct", auditProductRouter);
mainRouter.use("/level", levelRouter);

module.exports = mainRouter;
