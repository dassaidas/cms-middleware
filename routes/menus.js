const express = require("express");
const router = express.Router();
const {
  getMenus,
  getParentMenus,
  createMenu,
} = require("../controllers/menuController");

router.get("/", getMenus);
router.get("/parents", getParentMenus);
router.post("/createMenu", createMenu);

module.exports = router;
