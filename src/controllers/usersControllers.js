const pool = require("../database/conexion");
const { resAllUser, hashedPassword } = require("../utils/userUtils");

const userGetAll = async () => {
  const [data] = await pool.query(
    `SELECT idUser, nameUser, lastNameUser, emailUser FROM user`
  );
  return resAllUser(data);
};

const userCreate = async (nameUser, lastNameUser, emailUser, passwordUser) => {
  const [emailExist] = await pool.query(
    `SELECT emailUser FROM user WHERE emailUser = ?`,
    [emailUser]
  );

  if (emailExist.length) {
    throw Error(`Este email ya se encuetra registrado`);
  }

  const password = await hashedPassword(passwordUser);

  await pool.query(
    `INSERT INTO user (nameUser, lastNameUser, emailUser, passwordUser) VALUES(?, ?, ?, ?)`,
    [nameUser, lastNameUser, emailUser, password]
  );
  return { state: "create-user", data: await userGetAll() };
};

module.exports = { userCreate, userGetAll };
