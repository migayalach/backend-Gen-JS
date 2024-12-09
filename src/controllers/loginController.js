const bcrypt = require("bcrypt");
const pool = require("../database/conexion");
const { postRegActivity } = require("./entryExitController");

const loginApp = async (emailUser, passwordUser) => {
  const [data] = await pool.query(
    `SELECT u.idUser, l.nameLevel, u.nameUser, u.passwordUser FROM user u, level l WHERE u.idLevel = l.idLevel AND emailUser = ? `,
    [emailUser]
  );

  if (!data.length) {
    throw Error(`Usuario no encontrado`);
  }

  if (!(await bcrypt.compare(passwordUser, data[0].passwordUser))) {
    throw new Error("Contraseña incorrecta");
  }

  await postRegActivity(data[0].idUser, 1);

  return {
    state: "login",
    access: true,
    data: {
      idUser: data[0].idUser,
      nameUser: data[0].nameUser,
      nameLevel: data[0].nameLevel,
      message: `Wellcome ${data[0].nameUser}`,
    },
  };
};

module.exports = { loginApp };
