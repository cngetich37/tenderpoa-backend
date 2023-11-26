const tenderPoaDoc = require("swagger-jsdoc");
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "tenderpoa-backend",
      version: "1.0.0",
      description: "API documentation for Tenderpoa system",
    },
  },
  // give the path to the routes
  apis: [`${__dirname}/routes/*.js`],
};

const tenderPoaSpec = tenderPoaDoc(options);

module.exports = tenderPoaSpec;
