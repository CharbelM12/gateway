require("dotenv").config();
module.exports = {
  port: process.env.PORT,
  database: {
    connectionString: process.env.DB_CONNECTION_STRING,
  },
  tokens: {
    accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
    accessTokenExpiry: "3h",
  },
  timestamps: true,
  collections: {
    auditTrailCollection: "auditTrail",
  },
  statusCodes: {
    minSuccessStatusCode: 200,
    maxSuccessStatusCode: 299,
  },
  corsHeaders: {
    allowedOrigin: "*",
    allowedMethods: "OPTIONS, GET, POST, PUT, PATCH, DELETE",
    allowedHeaders: "Content-Type, Authorization",
  },
};
