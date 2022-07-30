const express = require("express");
const router = express.Router();
const { searchUsers } = require("../controllers/messages");
const { jwtAuth } = require("../middleware/jwtAuth");

router.post("/search", jwtAuth, searchUsers);

module.exports = router;
