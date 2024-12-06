const pool = require("../database/conexion");
const responseData = require("../utils/response");

const getAllLevel = async () => {
  const [data] = await pool.query(`SELECT * FROM level`);
  return responseData(data, (page = 1), "level");
};

module.exports = {
  getAllLevel,
};
