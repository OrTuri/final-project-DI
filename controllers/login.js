const jwt = require("jsonwebtoken");

const postLogin = (req, res) => {
  console.log(req.body);
  res.send(req.body);
};

module.exports = { postLogin };
