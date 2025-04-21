const apiClient = require("../services/apiClient");
const logger = require("../utils/logger");

exports.getPermissionMatrix = async (req, res) => {
  const token = req.headers.authorization;

  if (!token?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Missing Bearer token." });
  }

  try {
    const response = await apiClient.get("/permissions/matrix", {
      headers: { Authorization: token },
    });
    res.json(response.data);
  } catch (error) {
    logger.error("[PermissionMatrix] Failed to fetch: %s", error.message);
    res.status(error.response?.status || 500).json({
      message: error.response?.data || "Failed to fetch permission matrix.",
    });
  }
};
