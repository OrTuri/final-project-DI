const jwt = require("jsonwebtoken");

const postLogin = (req, res) => {
  if (req.body.username === "or" && req.body.password === "123") {
    res.cookie(
      "token",
      jwt.sign({ msg: "Secret message" }, process.env.JWT_SECRET),
      { httpOnly: true }
    );
  }
  res.send({ msg: "ERROR!" });
};

module.exports = { postLogin };
