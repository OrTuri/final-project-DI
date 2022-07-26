const express = require("express");
const router = express.Router();
const {
  sendActivities,
  addActivity,
  deleteActivity,
} = require("../controllers/activities");

router.post("/all", sendActivities);
router.post("/add", addActivity);
router.delete("/del", deleteActivity);

module.exports = router;
