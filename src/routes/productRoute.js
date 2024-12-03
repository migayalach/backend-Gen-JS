const { Router } = require("express");
const {
  postProduct,
  getAllProduct,
  getIdProduct,
  removeProduct,
  putProduct,
} = require("../handlers/productHandler");

const productRouter = Router();

productRouter.post("/", postProduct);
productRouter.get("/", getAllProduct);
productRouter.get("/:idProduct", getIdProduct);
productRouter.delete("/:idProduct", removeProduct);
productRouter.put("/", putProduct);

module.exports = productRouter;
