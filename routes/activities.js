const express = require("express");
const router = express.Router();
const { sendActivities, addActivity } = require("../controllers/activities");

router.post("/all", sendActivities);
router.post("/add", addActivity);

module.exports = router;
