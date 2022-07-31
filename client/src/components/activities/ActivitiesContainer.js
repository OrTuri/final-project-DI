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
import Loader from "../loader/Loader";

const ActivitiesContainer = (props) => {
  const { userDetails, loading } = useSelector((state) => state.userData);
  const { clickedLocation } = useSelector((state) => state.map);
  const dispatch = useDispatch();
  const onLogout = async () => {
    await axios({
      url: `${process.env.REACT_APP_PROXY || ""}/logout`,
      method: "POST",
      withCredentials: true,
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
      <h1 className={style["main-heading"]}>
        Welcome {userDetails.fullName.split(" ")[0]}!
      </h1>
      <div className={style["heading-container"]}>
        <div className={style.btn}>
          <Link to="/home/all" className={style.link}>
            <Button label="All Activities" color="#EC994B" width="120px" />
          </Link>
        </div>
        <Link to="/home/messages" className={style.link}>
          <Button label="Messages" color="#EF5B0C" width="120px" />
        </Link>
      </div>
      {!clickedLocation && (
        <h2 className={style["add-activity-title"]}>
          Click on the map to add an activity
        </h2>
      )}
      {clickedLocation && <ActivityForm />}
      <RecentActivities />
      <Link to="" className={style.link}>
        <Button
          label="LOGOUT"
          color="#EB1D36"
          width="120px"
          onClick={onLogout}
        />
      </Link>
      {loading && <Loader />}
    </div>
  );
};

export default ActivitiesContainer;
