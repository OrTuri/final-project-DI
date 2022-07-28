const jwt = require("jsonwebtoken");

const postAuth = (req, res) => {
  const token = req.cookies.token || req.headers.authorization;
  jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
    if (err) {
      res.status(403).send();
    }
    if (decode) {
      res.status(200).json(decode);
    }
  });
};

module.exports = { postAuth };
