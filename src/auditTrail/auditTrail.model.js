const mongoose = require("mongoose");
const config = require("../configurations/config");
const Schema = mongoose.Schema;
const auditTrailSchema = new Schema(
  {
    microservice: String,
    url: String,
    method: String,
    statusCode: Number,
    userId: mongoose.Schema.Types.ObjectId,
    userAgent: String,
    result: String,
    success: Boolean,
    headers: Object,
    params: Object,
    body: Object,
  },
  { timestamps: config.timestamps }
);
module.exports = mongoose.model(
  config.collections.auditTrailCollection,
  auditTrailSchema
);
