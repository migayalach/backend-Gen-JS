const { response } = require("express");
const { userCreate, userGetAll } = require("../controllers/usersControllers");

const postUser = (request, response) => {
  try {
    const data = userCreate();
    response.status(200).json(data);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

const getUserAll = (request, response) => {
  try {
    const data = userGetAll();
    response.status(200).json(data);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

module.exports = { postUser, getUserAll };
