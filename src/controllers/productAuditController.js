const pool = require("../database/conexion");

const addAuditProduct = async (
  idProduct,
  idUser,
  idAction,
  timeAction,
  oldData,
  newData
) => {
  const currentDate = new Date();
  return "add";
};

const getAllAuditProduct = async () => {
  return "all";
};

module.exports = {
  addAuditProduct,
  getAllAuditProduct,
};
