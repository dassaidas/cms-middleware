const logger = require("../utils/logger");

const errorHandler = (err, req, res, next) => {
  const status = err.statusCode || 500;
  const isDev = process.env.NODE_ENV !== "production";

  logger.error(`${req.method} ${req.originalUrl} - ${err.message}`);

  res.status(status).json({
    code: status,
    message: isDev ? err.message : "Something went wrong.",
    ...(isDev && { stack: err.stack }),
  });
};

module.exports = errorHandler;
