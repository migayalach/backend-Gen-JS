const {
  postRegActivity,
  getAllActivity,
} = require("../controllers/entryExitController");

const postActivity = async (request, response) => {
  const { idUser, idEntryExit } = request.body;
  try {
    const data = await postRegActivity(idUser, idEntryExit);
    response.status(200).json(data);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

const getActivityAll = async (request, response) => {
  try {
    const data = await getAllActivity();
    response.status(200).json(data);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

module.exports = { postActivity, getActivityAll };
