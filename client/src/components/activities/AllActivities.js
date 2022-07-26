import style from "./AllActivities.module.css";
import Button from "../UI/Form/Button";
import { Link } from "react-router-dom";

const AllActivities = (props) => {
  return (
    <div className={style["activities-container"]}>
      <Link to="/home" className={style.link}>
        <Button label="Go Back" width="100px" />
      </Link>
      <h1 className={style["main-heading"]}>All Activities</h1>
    </div>
  );
};

export default AllActivities;
