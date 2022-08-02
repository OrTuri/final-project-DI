const express = require("express");
const router = express.Router();
const { saveFood } = require("../controllers/nutrition");

router.post("/save", saveFood);

module.exports = router;
