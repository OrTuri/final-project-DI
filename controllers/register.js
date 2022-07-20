const { getPropertyFromDB } = require("../database/dbModules");

const postRegister = (req, res) => {
  console.log(req.body);
};

module.exports = { postRegister };
