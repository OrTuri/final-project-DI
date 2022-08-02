const { pushDataToDB } = require("../database/dbModules");

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

module.exports = { saveFood };
