import { useSelector, useDispatch } from "react-redux";
import style from "./ActivitiesContainer.module.css";
import ActivityForm from "./ActivityForm";
import { loadUserActivities } from "../../features/userDataSlice";
import { useEffect } from "react";
import RecentActivities from "./RecentActivities";
import Button from "../UI/Form/Button";
import { useNavigate, Link } from "react-router-dom";

const ActivitiesContainer = (props) => {
  const navigate = useNavigate();
  const { userDetails } = useSelector((state) => state.userData);
  const { clickedLocation } = useSelector((state) => state.map);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUserActivities());
  }, []);
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
          onClick={() => navigate("/login", { replace: true })}
        />
      </div>
      {!clickedLocation && (
        <h2 className={style["add-activity-title"]}>
          Click on the map to add an activity
        </h2>
      )}
      {clickedLocation && <ActivityForm />}
      <h3 className={style["recent-activity-title"]}>
        5 most recent activities:
      </h3>
      <RecentActivities />
      <div></div>
    </div>
  );
};

export default ActivitiesContainer;
