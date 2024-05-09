const mongoose = require("mongoose");
const config = require("../configurations/config");
const connect = async () => {
  await mongoose.connect(config.database.connectionString);
};
module.exports = connect;
