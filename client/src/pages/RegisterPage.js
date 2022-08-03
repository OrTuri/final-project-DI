import style from "./RegisterPage.module.css";
import Button from "../components/UI/Form/Button";
import Input from "../components/UI/Form/Input";
import Frame from "../components/UI/Frame";
import { Link } from "react-router-dom";
import axios from "axios";
import Modal from "../components/UI/modal/Modal";
import { useDispatch, useSelector } from "react-redux";
import { inputValues, resetInputs } from "../features/registerSlice";
import { setModal, setModalTitle, setModalBody } from "../features/modalSlice";
import { useNavigate } from "react-router-dom";

const RegisterPage = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { inputs } = useSelector((state) => state.register);
  const { isOpen } = useSelector((state) => state.modal);
  const handleChange = (e) => {
    dispatch(inputValues({ name: e.target.name, value: e.target.value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios({
        url: `${process.env.REACT_APP_PROXY || ""}/register`,
        method: "POST",
        data: inputs,
      });

      if (res.status === 200) {
        dispatch(setModal(true));
        dispatch(setModalTitle("Registered Successfully! 🟢"));
        dispatch(setModalBody("Please Login"));
        // navigate("/login", { replace: true });
      }
      dispatch(resetInputs());
    } catch (err) {
      console.log(err);
      const {
        response: {
          data: { msg: errorMsg },
        },
      } = err;
      dispatch(setModal(true));
      dispatch(setModalTitle("ERROR! ⚠️"));
      dispatch(setModalBody(errorMsg));
    }
  };
  return (
    <Frame>
      <Modal
        btn1Label="Close"
        onClose={navigate.bind(null, "/login", { replace: true })}
      />
      <div className={style.container}>
        <h1 className={style.heading}>Register</h1>
        <form onSubmit={handleSubmit}>
          <Input
            name="fullName"
            onChange={handleChange}
            placeholder="Full Name"
            type="text"
            required
            value={inputs.fullName}
          />
          <Input
            name="age"
            onChange={handleChange}
            placeholder="Age"
            type="number"
            required
            value={inputs.age}
          />
          <Input
            name="height"
            onChange={handleChange}
            placeholder="Height (CM)"
            type="number"
            required
            value={inputs.height}
          />
          <Input
            name="weight"
            onChange={handleChange}
            placeholder="Weight (KG)"
            type="number"
            required
            value={inputs.weight}
          />
          <div className={style["gender-container"]}>
            <span className={style.gender}>Gender:</span>
            <div className={style["gender-inputs"]}>
              <label htmlFor="male">Male</label>
              <input
                onChange={handleChange}
                type="radio"
                id="male"
                name="gender"
                value="male"
                checked={inputs.gender === "male"}
              />
              <label htmlFor="female">Female</label>
              <input
                onChange={handleChange}
                type="radio"
                id="female"
                name="gender"
                value="female"
              />
            </div>
          </div>
          <Input
            name="username"
            onChange={handleChange}
            value={inputs.username}
            placeholder="Username"
            type="text"
            autoComplete="username"
            required
          />
          <Input
            name="password"
            onChange={handleChange}
            value={inputs.password}
            placeholder="Password"
            type="password"
            autoComplete="current-password"
            required
          />
          <Button type="submit" width="120px">
            REGISTER
          </Button>
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
