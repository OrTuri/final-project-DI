const { getPropertyFromDB, pushDataToDB } = require("../database/dbModules");

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

const addActivity = (req, res) => {
  console.log(req.body);
  const {
    userId: user_id,
    activity: activity_name,
    duration: activity_duration,
    caloriesBurned: calories_burned,
    date,
    location,
  } = req.body;
  pushDataToDB("exercise_tracking_activities", {
    user_id,
    activity_name,
    activity_duration,
    calories_burned,
    date,
    location,
  }).then((data) => {
    getPropertyFromDB("exercise_tracking_activities", "*", { user_id }).then(
      (data) => {
        res.json(data);
      }
    );
  });
};

module.exports = { sendActivities, addActivity };
