import { useSelector } from "react-redux";
import style from "./ActivitiesContainer.module.css";
import ActivityForm from "./ActivityForm";

const ActivitiesContainer = (props) => {
  const { userDetails } = useSelector((state) => state.userData);
  return (
    <div className={style["activities-container"]}>
      <h1 className={style["main-heading"]}>
        Welcome {userDetails.fullName.split(" ")[0]}!
      </h1>
      <h3 className={style["add-activity-title"]}>
        Click on the map to add an activity
      </h3>
      <ActivityForm />
    </div>
  );
};

export default ActivitiesContainer;
