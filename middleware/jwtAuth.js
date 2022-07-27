const jwt = require("jsonwebtoken");

const jwtAuth = (req, res, next) => {
  const { token } = req.cookies;
  jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
    if (decode) {
      next();
      return;
    } else if (err) {
      res.status(403).send();
    }
  });
};

module.exports = { jwtAuth };
