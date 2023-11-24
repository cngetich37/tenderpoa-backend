const { constants } = require("../constants");
const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;

  switch (statusCode) {
    case constants.VALIDATION_ERROR:
      res.json({ title: "All fields are required!", message: err.message });
      break;
    case constants.UNATHORIZED:
      res.json({ title: "Not Authorized!", message: err.message });
      break;
    case constants.FORBIDDEN:
      res.json({ title: "ForBidden!", message: err.message });
      break;
    case constants.NOT_FOUND:
      res.json({ title: "Not Found!", message: err.message });
      break;
    case constants.SERVER_ERROR:
      res.json({ title: "Server Error!", message: err.message });
      break;
    default:
      console.log("All is well!!");
      break;
  }
};

module.exports = errorHandler;