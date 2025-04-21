const axios = require("axios");
const https = require("https");

const isDev = process.env.NODE_ENV === "development";

const apiClient = axios.create({
  baseURL: process.env.DOTNET_API_BASE_URL || "https://localhost:7105/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
  ...(isDev && {
    httpsAgent: new https.Agent({ rejectUnauthorized: false }),
  }),
});

module.exports = apiClient;
