const { getAllLevel } = require("../controllers/levelController");

const getLevelAll = async (request, response) => {
  try {
    const data = await getAllLevel();
    response.status(200).json(data);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

module.exports = { getLevelAll };
