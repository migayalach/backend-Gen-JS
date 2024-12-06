const {
  addAuditProduct,
  getAllAuditProduct,
} = require("../controllers/productAuditController");

const postAuditProduct = async (request, response) => {
  const { idUser, idAction, oldData, newData } = request.body;
  try {
    const data = await addAuditProduct(idUser, idAction, oldData, newData);
    response.status(200).json(data);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

const getAuditProductAll = async (request, response) => {
  const { page } = request.query;
  try {
    const data = await getAllAuditProduct(page);
    response.status(200).json(data);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

module.exports = {
  postAuditProduct,
  getAuditProductAll,
};
