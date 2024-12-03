const {
  addAuditProduct,
  getAllAuditProduct,
} = require("../controllers/productAuditController");

const postAuditProduct = async (request, response) => {
  const { idProduct, idUser, idAction, timeAction, oldData, newData } =
    request.body;
  try {
    const data = await addAuditProduct(
      idProduct,
      idUser,
      idAction,
      timeAction,
      oldData,
      newData
    );
    response.status(200).json(data);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

const getAuditProductAll = async (request, response) => {
  try {
    const data = await getAllAuditProduct();
    response.status(200).json(data);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

module.exports = {
  postAuditProduct,
  getAuditProductAll,
};