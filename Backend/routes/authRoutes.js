const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { login, register } = require("../controllers/authController");
const {
  sendMessage,
  viewMessage,
} = require("../controllers/whatsappController");

router.post("/login", login);
router.post("/register", register);
router.post("/send", protect, sendMessage);
router.post("/view", protect, viewMessage);

module.exports = router;
