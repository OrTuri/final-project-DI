const {
  searchRecordsWhereIlike,
  pushDataToDB,
  getPropertyFromDBWithOrWhere,
  getPropertyFromDB,
  db,
} = require("../database/dbModules");

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

const sendMessage = (req, res) => {
  const { senderUserId, receiverUserId, message, date } = req.body;
  pushDataToDB("exercise_tracking_messages", {
    from_user_id: senderUserId,
    to_user_id: receiverUserId,
    message_content: message,
    date,
  }).then((result) => {
    res.sendStatus(200);
  });
};

const getMessages = (req, res) => {
  const { senderUserId, receiverUserId } = req.body;
  db("exercise_tracking_messages")
    .select("*")
    .where({
      from_user_id: senderUserId,
      to_user_id: receiverUserId,
    })
    .orWhere({ from_user_id: receiverUserId, to_user_id: senderUserId })
    .innerJoin("exercise_tracking_users", "from_user_id", "=", "user_id")
    .then((result) => {
      res.json(result);
    });
};

module.exports = { searchUsers, sendMessage, getMessages };
