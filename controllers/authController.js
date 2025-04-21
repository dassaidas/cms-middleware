const apiClient = require("../services/apiClient");
const logger = require("../utils/logger");

exports.login = async (req, res) => {
  try {
    const response = await apiClient.post("/auth/login", req.body);
    res.json(response.data);
  } catch (error) {
    logger.error("Login error:", error.message);
    res.status(error.response?.status || 500).json({
      message: error.response?.data || "Login failed",
    });
  }
};

exports.refreshToken = async (req, res) => {
  try {
    const token = req.body.refreshToken;
    const response = await apiClient.post("/auth/refresh-token", {
      refreshToken: token,
    });
    res.json(response.data);
  } catch (error) {
    logger.error("Refresh token error:", error.message);
    res.status(error.response?.status || 500).json({
      message: error.response?.data || "Token refresh failed",
    });
  }
};

exports.logout = async (req, res) => {
  const token = req.headers.authorization;
  if (!token?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Missing Bearer token" });
  }

  try {
    const response = await apiClient.post(
      "/auth/logout",
      {},
      {
        headers: { Authorization: token },
      }
    );
    res.json(response.data);
  } catch (error) {
    logger.error("Logout error:", error.message);
    res.status(error.response?.status || 500).json({
      message: error.response?.data || "Logout failed",
    });
  }
};
