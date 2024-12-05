const { response } = require("express");
const {
  userCreate,
  userRegister,
  userGetAll,
  userUpdate,
} = require("../controllers/usersControllers");

const postUser = async (request, response) => {
  const { idLevel, nameUser, lastNameUser, emailUser, passwordUser, flag } =
    request.body;
  try {
    const data =
      flag === "create"
        ? await userCreate(idLevel, nameUser, lastNameUser, emailUser)
        : await userRegister(nameUser, lastNameUser, emailUser, passwordUser);
    response.status(200).json(data);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

const getUserAll = async (request, response) => {
  try {
    const data = await userGetAll();
    response.status(200).json(data);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

const putUser = async (request, response) => {
  const { idLevel, nameUser, lastNameUser, emailUser, passwordUser } =
    request.body;
  try {
    const data = await userUpdate(
      idLevel,
      nameUser,
      lastNameUser,
      emailUser,
      passwordUser
    );
    response.status(200).json(data);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

module.exports = { postUser, getUserAll, putUser };
