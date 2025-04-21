// server.js (Fixed version)
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const logger = require("./utils/logger");
const errorHandler = require("./middleware/errorHandler");
const responseTime = require("response-time");

const app = express();
const PORT = process.env.PORT || 5000;

// CORS
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:3000",
    credentials: true,
  })
);

// Log response time
app.use(
  responseTime((req, res, time) => {
    logger.info(`${req.method} ${req.originalUrl} - ${time.toFixed(2)}ms`);
  })
);

// Body parsing
app.use(
  bodyParser.json({
    strict: false,
    verify: (req, res, buf) => {
      if (buf.length === 0) req.body = {};
    },
  })
);
app.use(express.urlencoded({ extended: true }));

// Log request body
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.originalUrl}`);
  if (["POST", "PUT", "PATCH"].includes(req.method) && req.body) {
    logger.info(`Request Body: ${JSON.stringify(req.body)}`);
  }
  next();
});

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/users", require("./routes/users"));
app.use("/api/menus", require("./routes/menus"));
app.use("api/permissions", require("./routes/permissions")); //

// Health check
app.get("/health", (req, res) => res.json({ status: "ok" }));

// Error handler
app.use(errorHandler);

app.listen(PORT, () => logger.info(`Server running on port ${PORT}`));
