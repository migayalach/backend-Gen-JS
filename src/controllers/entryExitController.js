const pool = require("../database/conexion");

const postRegActivity = async (idUser, idEntryExit) => {
  const currentDate = new Date();
  await pool.query(
    `INSERT INTO entryExitUser (idUser, idEntryExit, timeEntryExit) VALUES (?,?,?)`,
    [idUser, idEntryExit, currentDate]
  );

  return;
};

const getAllActivity = async () => {
  const [data] = await pool.query(
    `SELECT u.nameUser, ex.nameEntryExit, e.timeEntryExit FROM entryExitUser e, user u, entryExit ex WHERE e.idUser = u.idUser AND e.idEntryExit = ex.idEntryExit ORDER BY e.timeEntryExit DESC`
  );
  return data;
};

module.exports = { postRegActivity, getAllActivity };
