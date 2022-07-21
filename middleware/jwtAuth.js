const jwt = require("jsonwebtoken");

const jwtAuth = (req, res, next) => {
  const { token } = req.cookies;
  jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
    if (decode) {
      req.jwt = decode;
      next();
      return;
    }
    console.log("JWT ERROR!!! =>>>", err);
  });
};

module.exports = { jwtAuth };
