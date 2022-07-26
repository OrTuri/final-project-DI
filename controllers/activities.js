const {
  getPropertyFromDB,
  pushDataToDB,
  deleteFromDB,
} = require("../database/dbModules");

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

const deleteActivity = (req, res) => {
  deleteFromDB("exercise_tracking_activities", { activity_id: req.body }).then(
    (returning) => console.log(returning)
  );
};

module.exports = { sendActivities, addActivity, deleteActivity };
