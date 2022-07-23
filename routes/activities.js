const express = require("express");
const router = express.Router();
const { sendActivities } = require("../controllers/activities");

router.post("/all", sendActivities);

module.exports = router;
