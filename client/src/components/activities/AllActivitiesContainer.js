import style from "./AllActivitiesContainer.module.css";
import Button from "../UI/Form/Button";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import AllActivities from "./AllActivities";
import { useEffect } from "react";
import { loadUserActivities } from "../../features/userDataSlice";
import { setSelectValue } from "../../features/filterActivitySlice";
import { setMode } from "../../features/mapSlice";

const AllActivitiesContainer = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setMode("add"));
  });
  useEffect(() => {
    dispatch(loadUserActivities());
  }, []);
  const changeHandler = (e) => {
    dispatch(setSelectValue(e.target.value));
  };
  const { selectValue } = useSelector((state) => state.filterActivity);
  return (
    <div className={style["activities-container"]}>
      <Link to="/home" className={style.link}>
        <Button label="Go Back" width="100px" />
      </Link>
      <h1 className={style["main-heading"]}>All Activities</h1>
      <div className={style.filter}>
        <label htmlFor="filter">Sort By</label>
        <select
          value={selectValue}
          id="filter"
          className={style.select}
          onChange={changeHandler}
        >
          <option value="date">Date</option>
          <option value="activity">Activity</option>
          <option value="calories">Calories</option>
          <option value="duration">Duration</option>
        </select>
      </div>
      <AllActivities />
    </div>
  );
};

export default AllActivitiesContainer;
