const { response } = require("express");
const {
  userCreate,
  userRegister,
  userGetAll,
  getUserId,
  userGetAllPage,
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
  const { page } = request.query;
  try {
    const data = page ? await userGetAllPage(page) : await userGetAll();
    response.status(200).json(data);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

const getIdUser = async (request, response) => {
  try {
    const { idUser } = request.params;
    const data = await getUserId(idUser);
    response.status(200).json(data);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

const putUser = async (request, response) => {
  const { idUser, idLevel, nameUser, lastNameUser, emailUser } = request.body;
  try {
    const data = await userUpdate(
      idUser,
      idLevel,
      nameUser,
      lastNameUser,
      emailUser
    );
    response.status(200).json(data);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

module.exports = { postUser, getUserAll, getIdUser, putUser };
