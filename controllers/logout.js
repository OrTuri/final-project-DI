const postLogout = (req, res) => {
  res.clearCookie("token").sendStatus(200);
};

module.exports = { postLogout };
