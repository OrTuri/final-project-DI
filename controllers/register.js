const { getPropertyFromDB, pushDataToDB } = require("../database/dbModules");
const bcrypt = require("bcrypt");

const postRegister = async (req, res) => {
  const { username, password, age, weight, height, gender, fullName } =
    req.body;
  console.log(req.body);
  const isUsernameExist =
    (
      await getPropertyFromDB("exercise_tracking_users", "username", {
        username,
      })
    ).length > 0;
  if (isUsernameExist) {
    res.status(406).json({
      msg: `The username '${username}' is already taken!\n Please choose a different username!`,
    });
    return;
  }
  const bmr =
    gender === "male"
      ? 88.362 + 13.397 * weight + 4.799 * height - 5.677 * age
      : 447.593 + 9.247 * weight + 3.098 * height - 4.33 * age;
  const salt = bcrypt.genSaltSync();
  const hashPassword = bcrypt.hashSync(password, salt);
  pushDataToDB("exercise_tracking_users", {
    username,
    password: hashPassword,
    bmr: Math.trunc(bmr),
    full_name: fullName,
  }).then((res) => console.log(res));
  res.status(200).send();
};

module.exports = { postRegister };
