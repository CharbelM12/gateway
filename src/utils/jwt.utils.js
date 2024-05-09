const config = require("../configurations/config");
const jwt = require("jsonwebtoken");

async function generateAccessTokens(payload) {
  const accessToken = jwt.sign(payload, config.tokens.accessTokenSecret, {
    expiresIn: config.tokens.accessTokenExpiry,
  });
  return accessToken;
}

module.exports = generateAccessTokens;
