import { useSelector, useDispatch } from "react-redux";
import style from "./ActivitiesContainer.module.css";
import ActivityForm from "./ActivityForm";
import { loadUserActivities } from "../../features/userDataSlice";
import { useEffect } from "react";
import RecentActivities from "./RecentActivities";

const ActivitiesContainer = (props) => {
  const { userDetails } = useSelector((state) => state.userData);
  const { clickedLocation } = useSelector((state) => state.map);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUserActivities());
  }, []);
  return (
    <div className={style["activities-container"]}>
      <h1 className={style["main-heading"]}>
        Welcome {userDetails.fullName.split(" ")[0]}!
      </h1>
      <h3 className={style["add-activity-title"]}>
        Click on the map to add an activity
      </h3>
      {clickedLocation && <ActivityForm />}
      <RecentActivities />
    </div>
  );
};

export default ActivitiesContainer;
