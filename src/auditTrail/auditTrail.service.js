const config = require("../configurations/config");
const auditTrailModel = require("./auditTrail.model");
const http = require("http");

class auditTrailService {
  async createAuditTrail(request, response, userId, microservice) {
    const isSuccessfull = this.checkRequestSuccess(response);
    await new auditTrailModel({
      microservice: microservice,
      url: request.url,
      method: request.method,
      statusCode: response.status,
      userId: userId,
      userAgent: request.headers["user-agent"],
      result: http.STATUS_CODES[response.status],
      success: isSuccessfull,
      headers: request.headers,
      params: request.params,
      body: request.body,
    }).save();
  }
  checkRequestSuccess(response) {
    if (
      response.status >= config.statusCodes.minSuccessStatusCode &&
      response.status <= config.statusCodes.maxSuccessStatusCode
    ) {
      return true;
    } else {
      return false;
    }
  }
}
module.exports = auditTrailService;
