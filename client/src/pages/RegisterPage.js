import style from "./RegisterPage.module.css";
import Button from "../components/UI/Form/Button";
import Input from "../components/UI/Form/Input";
import Frame from "../components/UI/Frame";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const RegisterPage = (props) => {
  return (
    <Frame>
      <div className={style.container}>
        <h1 className={style.heading}>Register</h1>
        <form>
          <Input placeholder="Full Name" type="text" required />
          <Input placeholder="Age" type="number" required />
          <Input placeholder="Height (CM)" type="number" required />
          <Input placeholder="Weight (KG)" type="number" required />
          <div className={style["gender-container"]}>
            <span className={style.gender}>Gender:</span>
            <div className={style["gender-inputs"]}>
              <label htmlFor="male">Male</label>
              <input type="radio" id="male" name="gender" defaultChecked />
              <label htmlFor="female">Female</label>
              <input type="radio" id="female" name="gender" />
            </div>
          </div>
          <Input
            placeholder="Username"
            type="text"
            autoComplete="username"
            required
          />
          <Input
            placeholder="Password"
            type="password"
            autoComplete="current-password"
            required
          />
          <Button label="REGISTER" type="submit" />
        </form>
        <p className={style.paragraph}>
          Already a user?{" "}
          <Link className={style.link} to="/login">
            Sign in now!
          </Link>
        </p>
      </div>
    </Frame>
  );
};

export default RegisterPage;
