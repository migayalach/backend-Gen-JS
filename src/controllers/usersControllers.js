const pool = require("../database/conexion");
const { resAllUser, hashedPassword } = require("../utils/userUtils");
const generator = require("generate-password");
const responseData = require("../utils/response");
const { requestUserDB } = require("./allQueryDB");
const _emailSend = require("../helpers/_sendEmail");

const userGetAll = async (access) => {
  const data = await requestUserDB();
  return responseData(
    resAllUser(data, access),
    (page = 1),
    `user?access=${access}&`
  );
};

const userGetAllPage = async (access, page) => {
  if (page < 1) {
    page = 1;
  }
  const data = await requestUserDB();
  return responseData(resAllUser(data, access), page, `user?access=${access}&`);
};

const getUserId = async (idUser) => {
  const [data] = await pool.query(
    `SELECT u.idUser, l.idLevel, l.nameLevel, u.nameUser, u.lastNameUser, emailUser FROM user u, level l WHERE u.idLevel = l.idLevel AND idUser = ?`,
    [idUser]
  );
  if (!data.length) {
    throw Error(`El usuario actual no se encuentra registrado`);
  }
  return data[0];
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

  // TODO Registro de usuario por parte del administrador
  await _emailSend(emailUser, nameUser);
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

  // TODO Registro por el mismo usuario
  // await _emailSend(emailUser, nameUser);
  const infoUser = await getUserId(data.insertId);

  return {
    state: "login",
    access: true,
    data: {
      idUser: infoUser.idUser,
      nameUser: infoUser.nameUser,
      nameLevel: infoUser.nameLevel,
      message: `Wellcome ${infoUser.nameUser}`,
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
    data: await getUserId(idUser),
  };
};

module.exports = {
  userCreate,
  userRegister,
  userGetAll,
  getUserId,
  userGetAllPage,
  userUpdate,
};
