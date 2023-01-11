const express = require("express");
const router = express.Router();
const {
  searchUsers,
  sendMessage,
  getMessages,
  recentMessages,
  deleteMessages,
} = require("../controllers/messages");
const { jwtAuth } = require("../middleware/jwtAuth");

router.post("/search", jwtAuth, searchUsers);
router.post("/send", jwtAuth, sendMessage);
router.post("/getMessages", jwtAuth, getMessages);
router.post("/recentMessages", jwtAuth, recentMessages);
router.delete("/delete", jwtAuth, deleteMessages);

module.exports = router;
