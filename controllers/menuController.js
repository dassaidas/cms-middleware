const apiClient = require("../services/apiClient");
const logger = require("../utils/logger");

exports.getMenus = async (req, res) => {
  const token = req.headers.authorization;
  if (!token?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Missing Bearer token" });
  }

  try {
    const response = await apiClient.get("/menu", {
      headers: { Authorization: token },
    });
    res.json(response.data);
  } catch (error) {
    logger.error("Get menus error:", error.message);
    res.status(error.response?.status || 500).json({
      message: error.response?.data || "Failed to fetch menus",
    });
  }
};

exports.getParentMenus = async (req, res) => {
  const token = req.headers.authorization;
  if (!token?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Missing Bearer token" });
  }

  try {
    const response = await apiClient.get("/menu/parents", {
      headers: { Authorization: token },
    });
    res.json(response.data);
  } catch (error) {
    logger.error("Get parent menus error:", error.message);
    res.status(error.response?.status || 500).json({
      message: error.response?.data || "Failed to fetch parent menus",
    });
  }
};

exports.createMenu = async (req, res) => {
  const token = req.headers.authorization;
  if (!token?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Missing Bearer token" });
  }

  try {
    const response = await apiClient.post("/menu/createMenu", req.body, {
      headers: { Authorization: token },
    });
    res.json(response.data);
  } catch (error) {
    logger.error("Create menu error:", error.message);
    res.status(error.response?.status || 500).json({
      message: error.response?.data || "Failed to create menu",
    });
  }
};
