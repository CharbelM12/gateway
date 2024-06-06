const axios = require("axios");
const generateAccessTokens = require("../utils/jwt.utils");

module.exports = async (req, res, next) => {
  try {
    const response = await axios.post(
      "http://localhost:3001/user/verify-token",
      req.body,
      {
        headers: {
          authorization: req.headers.authorization,
        },
      }
    );
    req.token = await generateAccessTokens(response.data);
    console.log(response.data);
    req.userId = response.data.userId;
    next();
  } catch (error) {
    next(error);
  }
};
