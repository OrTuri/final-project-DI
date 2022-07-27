const {
  getPropertyFromDB,
  pushDataToDB,
  deleteFromDB,
  updateRecord,
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
  deleteFromDB("exercise_tracking_activities", {
    activity_id: req.body,
  }).then(() => {
    res.send();
  });
};

const editActivity = (req, res) => {
  console.log(req.body);
  const { activityId, duration, coords, date, activity, caloriesBurned } =
    req.body;
  updateRecord(
    "exercise_tracking_activities",
    { activity_id: activityId },
    {
      activity_duration: duration,
      location: coords,
      date,
      activity_name: activity,
      calories_burned: caloriesBurned,
    }
  ).then((data) => {
    res.send();
  });
};

module.exports = { sendActivities, addActivity, deleteActivity, editActivity };
