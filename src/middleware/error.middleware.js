module.exports = (error, req, res, next) => {
  const errorResponse = error.response.data.message;
  const response = {
    message: errorResponse || "Something went wrong",
  };
  const status = error.response.status || 500;
  if (error && error.response.data.message === "Validation Failed") {
    res.status(400).send(response);
  } else {
    res.status(status).send(response);
  }
  res.end();
};
