const { pushDataToDB, getPropertyFromDB } = require("../database/dbModules");

const saveFood = (req, res) => {
  const {
    calories,
    userId: user_id,
    carbohydrates,
    grams,
    fat,
    name,
    protein,
    imgSrc,
  } = req.body;
  pushDataToDB("exercise_tracking_nutrition", {
    calories,
    user_id,
    carbohydrates,
    grams,
    fat,
    name,
    protein,
    imgSrc,
  })
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(403);
    });
};

const getFavourites = (req, res) => {
  const user_id = req.body;
  getPropertyFromDB("exercise_tracking_nutrition", "*", { user_id })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(403);
    });
};

module.exports = { saveFood, getFavourites };
