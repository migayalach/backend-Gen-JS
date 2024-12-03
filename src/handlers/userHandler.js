const { response } = require("express");
const { userCreate } = require("../controllers/usersControllers");

const postUser = (request, response) => {
  try {
    const data = userCreate();
    response.status(200).json(data);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

module.exports = { postUser };
