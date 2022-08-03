const express = require("express");
const router = express.Router();
const {
  saveFood,
  getFavourites,
  deleteFood,
} = require("../controllers/nutrition");

router.post("/save", saveFood);
router.post("/favourites", getFavourites);
router.delete("/delete", deleteFood);

module.exports = router;
