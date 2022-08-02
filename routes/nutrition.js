const express = require("express");
const router = express.Router();
const { saveFood, getFavourites } = require("../controllers/nutrition");

router.post("/save", saveFood);
router.post("/favourites", getFavourites);

module.exports = router;
