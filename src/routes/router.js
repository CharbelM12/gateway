const axios = require("axios");
const isAuth = require("../middleware/isAuth.middleware");
const AuditTrailService = require("../auditTrail/auditTrail.service");
const auditTrailService = new AuditTrailService();
const express = require("express");
const router = express.Router();
const _ = require("lodash");
const routes = require("./routes");

routes.forEach((route) => {
  if (route.isAuthenticated) {
    router.use(`${route.api}`, isAuth);
  }

  let routerInstance = router.route(route.api);
  const method = route.method.toLowerCase();

  switch (method) {
    case "get":
      routerInstance.get(globalRoutingFunction);
      break;
    case "post":
      routerInstance.post(globalRoutingFunction);
      break;
    case "delete":
      routerInstance.delete(globalRoutingFunction);
      break;
    case "put":
      routerInstance.put(globalRoutingFunction);
      break;
  }
});

async function globalRoutingFunction(req, res, next) {
  const method = req.method.toLowerCase();
  const urlWithoutQueryParams = req.url.split("?")[0];

  const currentRouteObj = routes.find((route) => {
    const routePathSegments = route.api.split("/");
    const reqPathSegments = urlWithoutQueryParams.split("/");
    if (route.method.toLowerCase() === method) {
      if (routePathSegments.length === reqPathSegments.length) {
        return routePathSegments.every((segment, index) => {
          return segment === reqPathSegments[index] || segment.startsWith(":");
        });
      }
    }
  });
  if (currentRouteObj) {
    try {
      const response = await axios({
        method: req.method,
        url: `${currentRouteObj.url}${req.url}`,
        headers: {
          authorization: req.token,
        },
        data: req.body,
        params: req.params,
      });
      await auditTrailService.createAuditTrail(
        req,
        response,
        req.userId,
        currentRouteObj.microservice
      );
      res.send(response.data);
    } catch (error) {
      await auditTrailService.createAuditTrail(
        req,
        error.response,
        req.userId,
        currentRouteObj.microservice
      );
      next(error);
    }
  }
}

module.exports = router;
