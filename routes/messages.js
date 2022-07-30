const express = require("express");
const router = express.Router();
const { searchUsers, sendMessage } = require("../controllers/messages");
const { jwtAuth } = require("../middleware/jwtAuth");

router.post("/search", jwtAuth, searchUsers);
router.post("/send", sendMessage);

module.exports = router;
