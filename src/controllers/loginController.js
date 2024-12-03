const bcrypt = require("bcrypt");
const pool = require("../database/conexion");
const { postRegActivity } = require("./entryExitController");

const loginApp = async (emailUser, passwordUser) => {
  const [data] = await pool.query(
    `SELECT idUser, nameUser, passwordUser FROM user WHERE emailUser = ? `,
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
      message: `Wellcome ${data[0].nameUser}`,
    },
  };
};

module.exports = { loginApp };
