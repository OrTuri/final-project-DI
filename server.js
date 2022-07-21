const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const loginRouter = require("./routes/login");
const registerRouter = require("./routes/register");
const authRouter = require("./routes/auth");
const cors = require("cors");
const cookieParser = require("cookie-parser");

app.listen(process.env.PORT || 4000, () => {
  console.log(`Server is currently running on port ${process.env.PORT}`);
});

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/login", loginRouter);
app.use("/register", registerRouter);
app.use("/auth", authRouter);
