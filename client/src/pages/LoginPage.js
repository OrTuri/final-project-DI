import Button from "../components/UI/Form/Button";
import Input from "../components/UI/Form/Input";
import Frame from "../components/UI/Frame";
import style from "./LoginPage.module.css";
import { Link } from "react-router-dom";
import icon from "../assets/mainIcon.png";
import { useState } from "react";
import axios from "axios";

const inputsInitialState = {
  username: "",
  password: "",
};

const LoginPage = (props) => {
  const [inputsValue, setInputsValue] = useState(inputsInitialState);
  const handleChange = (e) => {
    setInputsValue((state) => {
      return { ...state, [e.target.name]: e.target.value };
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios({
      url: "/login/verify",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: inputsValue,
    });
    console.log(res);
    setInputsValue(inputsInitialState);
  };
  return (
    <Frame>
      <div className={style.container}>
        <h5 className={style.heading}>
          Welcome to Exercise Tracking{" "}
          <img className={style.icon} src={icon} alt="logo" />{" "}
        </h5>
        <h1 className={style["secondary-heading"]}>Login</h1>
        <form onSubmit={handleSubmit}>
          <Input
            value={inputsValue.username}
            name="username"
            onChange={handleChange}
            placeholder="Username"
            type="text"
            autoComplete="username"
            required
          />
          <Input
            value={inputsValue.password}
            onChange={handleChange}
            name="password"
            placeholder="Password"
            type="password"
            autoComplete="current-password"
            required
          />
          <Button label="SIGN IN" type="submit" />
        </form>
        <p className={style.paragraph}>
          Not a user?{" "}
          <Link className={style.link} to="/register">
            register now!
          </Link>
        </p>
      </div>
    </Frame>
  );
};

export default LoginPage;
