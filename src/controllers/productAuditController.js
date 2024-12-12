const pool = require("../database/conexion");
const { clearAuditProduct } = require("../utils/productAuditUtils");
const responseData = require("../utils/response");

const addAuditProduct = async (
  idUser,
  idProduct,
  idAction,
  oldData,
  newData
) => {
  const currentDate = new Date();
  await pool.query(
    `INSERT INTO productAction (idProduct, idUser, idAction, timeAction, oldData, newData) VALUES (?, ?, ?, ?, ?, ?)`,
    [
      idProduct,
      idUser,
      idAction,
      currentDate,
      JSON.stringify(oldData),
      JSON.stringify(newData),
    ]
  );
  return;
};

const getAllAuditProduct = async (page) => {
  if (!page) {
    page = 1;
  }
  const [data] = await pool.query(
    `SELECT u.nameUser, a.nameAction, pa.timeAction, pa.oldData, pa.newData FROM user u, actions a, productAction pa WHERE pa.idUser = u.idUser AND pa.idAction = a.idAction`
  );

  return responseData(clearAuditProduct(data), page, "auditProduct?");
};

module.exports = {
  addAuditProduct,
  getAllAuditProduct,
};
