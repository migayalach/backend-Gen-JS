const {
  productCreate,
  getAllProducts,
  getIdProducts,
  deleteProduct,
  updateProduct,
  seeRemoveProducts
} = require("../controllers/productControllers");

const postProduct = async (request, response) => {
  const {
    nameProduct,
    codeProduct,
    priceProduct,
    urlProduct,
    stockProduct,
    madeProduct,
    sizeProduct,
    dateIntroProduct,
  } = request.body;
  try {
    const data = await productCreate(
      nameProduct,
      codeProduct,
      priceProduct,
      urlProduct,
      stockProduct,
      madeProduct,
      sizeProduct,
      dateIntroProduct
    );
    response.status(200).json(data);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

const getAllProduct = async (request, response) => {
  const { flag } = request.query;
  try {
    const data = flag === "delete" ? await seeRemoveProducts() : await getAllProducts();
    response.status(200).json(data);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

const getIdProduct = async (request, response) => {
  const { idProduct } = request.params;
  try {
    const data = await getIdProducts(idProduct);
    response.status(200).json(data);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

const removeProduct = async (request, response) => {
  const { idProduct } = request.params;
  try {
    const data = await deleteProduct(idProduct);
    response.status(200).json(data);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

const putProduct = async (request, response) => {
  const {
    idProduct,
    nameProduct,
    codeProduct,
    priceProduct,
    urlProduct,
    stockProduct,
    madeProduct,
    sizeProduct,
    dateIntroProduct,
    stateProduct,
  } = request.body;
  try {
    const data = await updateProduct(
      idProduct,
      nameProduct,
      codeProduct,
      priceProduct,
      urlProduct,
      stockProduct,
      madeProduct,
      sizeProduct,
      dateIntroProduct,
      stateProduct
    );
    response.status(200).json(data);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

module.exports = {
  postProduct,
  getAllProduct,
  getIdProduct,
  removeProduct,
  putProduct,
};
