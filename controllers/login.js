const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { getPropertyFromDB } = require("../database/dbModules");

const postLogin = async (req, res) => {
  const { username, password } = req.body;
  const isUsernameExist =
    (
      await getPropertyFromDB("exercise_tracking_users", "username", {
        username,
      })
    ).length > 0;
  if (!isUsernameExist) {
    res.status(402).json({ msg: `The username '${username}' does not exist!` });
    return;
  }
  const [{ password: hashPassword }] = await getPropertyFromDB(
    "exercise_tracking_users",
    "password",
    { username }
  );
  const isPaasswordCorrect = bcrypt.compareSync(password, hashPassword);
  if (!isPaasswordCorrect) {
    res.status(403).json({ msg: "Password is incorrect! ⛔" });
    return;
  }

  const [{ user_id: userId, bmr, full_name: fullName }] =
    await getPropertyFromDB("exercise_tracking_users", "*", {
      username,
    });

  const userData = { username, fullName, bmr, userId };

  res.cookie(
    "token",
    jwt.sign(userData, process.env.JWT_SECRET, { expiresIn: "0.5h" }),
    {
      httpOnly: true,
    }
  );
  res.status(200).send();
};

module.exports = { postLogin };
