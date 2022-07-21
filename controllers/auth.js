const jwt = require("jsonwebtoken");

const postAuth = (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
    if (err) {
      res.status(403).json({ auth: false });
    }
    if (decode) {
      res.status(200).json({ auth: true });
    }
  });
};

module.exports = { postAuth };
