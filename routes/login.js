const express = require("express");
const router = express.Router();
const { postLogin } = require("../controllers/login");

router.post("/verify", postLogin);

module.exports = router;
