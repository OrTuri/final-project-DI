import { useSelector, useDispatch } from "react-redux";
import style from "./ActivitiesContainer.module.css";
import ActivityForm from "./ActivityForm";
import { loadUserActivities } from "../../features/userDataSlice";
import { useEffect } from "react";
import RecentActivities from "./RecentActivities";
import Button from "../UI/Form/Button";
import { Link } from "react-router-dom";
import { setMode } from "../../features/mapSlice";
import axios from "axios";
import { setNavigateLogin, setToken } from "../../features/authenticationSlice";

const ActivitiesContainer = (props) => {
  const { userDetails } = useSelector((state) => state.userData);
  const { clickedLocation } = useSelector((state) => state.map);
  const dispatch = useDispatch();
  const onLogout = async () => {
    await axios({
      url: `${process.env.REACT_APP_PROXY}/logout`,
      method: "POST",
    });
    dispatch(setNavigateLogin(true));
    dispatch(setToken(""));
  };
  useEffect(() => {
    dispatch(setMode("add"));
  });
  useEffect(() => {
    dispatch(loadUserActivities());
  }, [dispatch]);
  return (
    <div className={style["activities-container"]}>
      <div className={style["heading-container"]}>
        <div className={style.btn}>
          <Link to="/home/all" className={style.link}>
            <Button label="All Activities" color="#EC994B" />
          </Link>
        </div>
        <h1 className={style["main-heading"]}>
          Welcome {userDetails.fullName.split(" ")[0]}!
        </h1>
        <Button
          label="LOGOUT"
          color="#EB1D36"
          width="100px"
          onClick={onLogout}
        />
      </div>
      {!clickedLocation && (
        <h2 className={style["add-activity-title"]}>
          Click on the map to add an activity
        </h2>
      )}
      {clickedLocation && <ActivityForm />}
      <RecentActivities />
    </div>
  );
};

export default ActivitiesContainer;
