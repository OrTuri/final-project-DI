const { getPropertyFromDB } = require("../database/dbModules");

const postRegister = async (req, res) => {
  console.log(req.body);
  const isUsernameExist =
    (
      await getPropertyFromDB("exercise_tracking_users", "username", {
        username: req.body.username,
      })
    ).length > 0;
  if (isUsernameExist) {
    res.status(406).json({
      msg: `The username '${req.body.username}' is already taken!\n Please choose a different username!`,
    });
  }
};

module.exports = { postRegister };
