const express = require("express");
const router = express.Router();
const { getPermissionMatrix } = require("../controllers/permissionController");

// GET /permissions/matrix
router.get("/matrix", getPermissionMatrix);

module.exports = router;
