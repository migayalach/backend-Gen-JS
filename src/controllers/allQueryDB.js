const pool = require("../database/conexion");

const requestUserDB = async () => {
  const [data] = await pool.query(
    `SELECT u.idUser, l.idLevel, l.nameLevel, u.nameUser, u.lastNameUser, emailUser FROM user u, level l WHERE u.idLevel = l.idLevel`
  );
  return data;
};

module.exports = { requestUserDB };
