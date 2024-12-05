const pool = require("../database/conexion");

const getAllLevel = async () => {
  const [data] = await pool.query(`SELECT * FROM level`);
  return data;
};

module.exports = {
  getAllLevel,
};
