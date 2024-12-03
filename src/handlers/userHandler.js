const { response } = require("express");
const { userCreate, userGetAll } = require("../controllers/usersControllers");

const postUser = async (request, response) => {
  const { nameUser, lastNameUser, emailUser, passwordUser } = request.body;
  try {
    const data = await userCreate(
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

const getUserAll = async (request, response) => {
  try {
    const data = await userGetAll();
    response.status(200).json(data);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

module.exports = { postUser, getUserAll };
