const userMiddleware = (request, response, next) => {
  const { access } = request.query;
  if (!access) {
    return response
      .status(400)
      .json({ message: `Se necesita un parametro de acceso` });
  }

  next();
};

module.exports = {
  userMiddleware,
};
