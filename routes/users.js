const express = require("express");
const router = express.Router();

// Example route: GET /api/users
router.get("/", (req, res) => {
  res.json({
    message: "User route is working",
    users: [
      { id: 1, name: "Sai Shankar" },
      { id: 2, name: "John Doe" },
    ],
  });
});

module.exports = router;
