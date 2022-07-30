const express = require("express");
const router = express.Router();
const {
  searchUsers,
  sendMessage,
  getMessages,
} = require("../controllers/messages");
const { jwtAuth } = require("../middleware/jwtAuth");

router.post("/search", jwtAuth, searchUsers);
router.post("/send", sendMessage);
router.post("/getMessages", getMessages);

module.exports = router;
