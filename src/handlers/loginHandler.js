const { loginApp } = require("../controllers/loginController");

const accessLogin = async(request, response) => {  
  try {
    const data = await loginApp();
    response.status(200).json(data);
  } catch (error) {
    response.status(400).json({ message: error.message, access: false });
  }
};

module.exports = { accessLogin };
