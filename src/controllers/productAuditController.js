const pool = require("../database/conexion");
const { clearAuditProduct } = require("../utils/productAuditUtils");

const addAuditProduct = async (idUser, idAction, oldData, newData) => {
  const currentDate = new Date();
  await pool.query(
    `INSERT INTO productAction (idUser, idAction, timeAction, oldData, newData) VALUES (?, ?, ?, ?, ?)`,
    [
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
    `SELECT u.nameUser, a.nameAction, pa.timeAction, pa.oldData, pa.newData FROM user u, actions a, productAction pa WHERE pa.idUser = u.idUser AND pa.idAction = a.idAction`
  );
  return clearAuditProduct(data);
};

module.exports = {
  addAuditProduct,
  getAllAuditProduct,
};
