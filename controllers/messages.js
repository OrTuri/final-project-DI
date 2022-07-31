const {
  searchRecordsWhereIlike,
  pushDataToDB,
  getPropertyFromDBWithOrWhere,
  getPropertyFromDB,
  db,
} = require("../database/dbModules");

const searchUsers = (req, res) => {
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
    .then((messages) => {
      db("exercise_tracking_users")
        .select("username")
        .where({ user_id: receiverUserId })
        .then((username) => {
          res.json({ messages, username: username[0] });
        });
    });
};

const recentMessages = (req, res) => {
  const id = Number(req.body);
  db("exercise_tracking_messages")
    .select("*")
    .innerJoin("exercise_tracking_users", "from_user_id", "=", "user_id")
    .where({ from_user_id: id })
    .orWhere({ to_user_id: id })
    .orderBy("date", "desc")
    .union([
      db("exercise_tracking_messages")
        .select("*")
        .innerJoin("exercise_tracking_users", "to_user_id", "=", "user_id")
        .where({ from_user_id: id })
        .orWhere({ to_user_id: id }),
    ])
    .then((result) => {
      const ids = [];
      const recentMessages = result.reduce((acc, curr) => {
        if (!ids.includes(curr.from_user_id) && curr.from_user_id !== id) {
          ids.push(curr.from_user_id);
          return [...acc, curr];
        }

        if (!ids.includes(curr.to_user_id) && curr.to_user_id !== id) {
          ids.push(curr.to_user_id);
          return [...acc, curr];
        }

        return acc;
      }, []);

      res.json(recentMessages);
    });
};

module.exports = { searchUsers, sendMessage, getMessages, recentMessages };
