const { loginApp } = require("../controllers/loginController");

const accessLogin = async (request, response) => {
  const { emailUser, passwordUser } = request.body;
  try {
    const data = await loginApp(emailUser, passwordUser);
    response.status(200).json(data);
  } catch (error) {
    response.status(400).json({ message: error.message, access: false });
  }
};

module.exports = { accessLogin };
