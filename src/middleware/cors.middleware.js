const config = require("../configurations/config");
module.exports = (req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    config.corsHeaders.allowedOrigin
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    config.corsHeaders.allowedMethods
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    config.corsHeaders.allowedHeaders
  );
  next();
};
