const { Router } = require("express");
const {
  postAuditProduct,
  getAuditProductAll,
} = require("../handlers/productAuditHandler");

const auditProductRouter = Router();

auditProductRouter.post("/", postAuditProduct);
auditProductRouter.get("/", getAuditProductAll);

module.exports = auditProductRouter;
