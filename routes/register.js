const { application } = require("express");
const express = require("express");
const router = express.Router();
const { postRegister } = require("../controllers/register");

router.post("/", postRegister);

module.exports = router;
