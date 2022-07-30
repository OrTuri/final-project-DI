const { searchRecordsWhereIlike } = require("../database/dbModules");

const searchUsers = (req, res) => {
  console.log(req.body);
  searchRecordsWhereIlike(
    "exercise_tracking_users",
    ["username", "user_id"],
    "username",
    `%${req.body}%`
  )
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = { searchUsers };
