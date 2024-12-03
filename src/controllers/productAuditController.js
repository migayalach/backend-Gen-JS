const pool = require("../database/conexion");
const { clearAuditProduct } = require("../utils/productAuditUtils");

const addAuditProduct = async (
  idProduct,
  idUser,
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

const getAllAuditProduct = async () => {
  const [data] = await pool.query(
    `SELECT p.nameProduct, p.codeProduct, u.nameUser, a.nameAction, pa.timeAction, pa.oldData, pa.newData FROM user u, product p, actions a, productAction pa WHERE pa.idProduct = p.idProduct AND pa.idUser = u.idUser AND pa.idAction = a.idAction`
  );
  return clearAuditProduct(data);
};

module.exports = {
  addAuditProduct,
  getAllAuditProduct,
};
