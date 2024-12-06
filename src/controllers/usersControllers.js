const pool = require("../database/conexion");
const { resAllUser, hashedPassword } = require("../utils/userUtils");
const generator = require("generate-password");
const responseData = require("../utils/response");

const requestUserDB = async () => {
  const [data] = await pool.query(
    `SELECT u.idUser, l.idLevel, l.nameLevel, u.nameUser, u.lastNameUser, emailUser FROM user u, level l WHERE u.idLevel = l.idLevel`
  );
  return data;
};

const userGetAll = async () => {
  const data = await requestUserDB();
  return responseData(resAllUser(data), (page = 1), "user");
};

const userGetAllPage = async (page) => {
  if (page < 1) {
    page = 1;
  }
  const data = await requestUserDB();
  return responseData(resAllUser(data), page, "user");
};

const userCreate = async (idLevel, nameUser, lastNameUser, emailUser) => {
  const [emailExist] = await pool.query(
    `SELECT emailUser FROM user WHERE emailUser = ?`,
    [emailUser]
  );

  if (emailExist.length) {
    throw Error(`Este email ya se encuetra registrado`);
  }

  const password = generator.generate({
    length: 12,
    numbers: true,
    uppercase: true,
    symbols: true,
  });

  await pool.query(
    `INSERT INTO user (idLevel, nameUser, lastNameUser, emailUser, passwordUser) VALUES(?, ?, ?, ?, ?)`,
    [idLevel, nameUser, lastNameUser, emailUser, await hashedPassword(password)]
  );

  console.log("envio a email la contraseña", password);
  return { state: "create-user", data: await userGetAll() };
};

const userRegister = async (
  nameUser,
  lastNameUser,
  emailUser,
  passwordUser
) => {
  const [emailExist] = await pool.query(
    `SELECT emailUser FROM user WHERE emailUser = ?`,
    [emailUser]
  );

  if (emailExist.length) {
    throw Error(`Este email ya se encuetra registrado`);
  }

  const [idUser] = await pool.query(`SELECT COUNT(idUser) as Users FROM user`);

  const password = await hashedPassword(passwordUser);

  const [data] = await pool.query(
    `INSERT INTO user (idLevel, nameUser, lastNameUser, emailUser, passwordUser) VALUES(?, ?, ?, ?, ?)`,
    [idUser[0].Users === 0 ? 1 : 3, nameUser, lastNameUser, emailUser, password]
  );

  console.log("envio un daludo de bienvenida a email");
  return {
    state: "login",
    access: true,
    data: {
      idUser: data.insertId,
      nameUser,
      message: `Wellcome ${nameUser}`,
    },
  };
};

const userUpdate = async (
  idUser,
  idLevel,
  nameUser,
  lastNameUser,
  emailUser
) => {
  await pool.query(
    `UPDATE user SET idLevel = ?, nameUser = ?, lastNameUser = ?, emailUser = ? WHERE idUser = ?`,
    [idLevel, nameUser, lastNameUser, emailUser, idUser]
  );

  return {
    state: "edit-user",
    data: await userGetAll(),
  };
};

module.exports = {
  userCreate,
  userRegister,
  userGetAll,
  userGetAllPage,
  userUpdate,
};
