const express = require("express");
const router = express.Router();
const {
  sendActivities,
  addActivity,
  deleteActivity,
  editActivity,
} = require("../controllers/activities");
const { jwtAuth } = require("../middleware/jwtAuth");

router.post("/all", jwtAuth, sendActivities);
router.post("/add", jwtAuth, addActivity);
router.delete("/del", jwtAuth, deleteActivity);
router.put("/edit", jwtAuth, editActivity);

module.exports = router;
