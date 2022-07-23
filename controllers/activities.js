const { getPropertyFromDB } = require("../database/dbModules");

const sendActivities = async (req, res) => {
  const { userId } = req.body;
  const activities = await getPropertyFromDB(
    "exercise_tracking_activities",
    "*",
    {
      user_id: userId,
    }
  );
  res.json(activities);
};

module.exports = { sendActivities };
