const express = require("express");
const router = express.Router();
const {
  sendActivities,
  addActivity,
  deleteActivity,
  editActivity,
} = require("../controllers/activities");

router.post("/all", sendActivities);
router.post("/add", addActivity);
router.delete("/del", deleteActivity);
router.put("/edit", editActivity);

module.exports = router;
