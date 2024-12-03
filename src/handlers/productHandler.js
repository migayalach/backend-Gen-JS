const {
  productCreate,
  getAllProducts,
  getIdProducts,
  deleteProduct,
  updateProduct,
} = require("../controllers/productControllers");

const postProduct = (request, response) => {
  try {
    const data = productCreate();
    response.status(200).json(data);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

const getAllProduct = (request, response) => {
  try {
    const data = getAllProducts();
    response.status(200).json(data);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

const getIdProduct = (request, response) => {
  try {
    const data = getIdProducts();
    response.status(200).json(data);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

const removeProduct = (request, response) => {
  try {
    const data = deleteProduct();
    response.status(200).json(data);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

const putProduct = (request, response) => {
  try {
    const data = updateProduct();
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
