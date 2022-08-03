import style from "./AllActivitiesContainer.module.css";
import Container from "../UI/container/Container";
import Button from "../UI/Form/Button";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import AllActivities from "./AllActivities";
import { useEffect } from "react";
import { loadUserActivities } from "../../features/userDataSlice";
import { setSelectValue } from "../../features/filterActivitySlice";
import { setMode } from "../../features/mapSlice";
import { BiArrowBack } from "react-icons/bi";

const AllActivitiesContainer = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setMode("add"));
  });
  useEffect(() => {
    dispatch(loadUserActivities());
  }, [dispatch]);
  const changeHandler = (e) => {
    dispatch(setSelectValue(e.target.value));
  };
  const { selectValue } = useSelector((state) => state.filterActivity);
  return (
    <Container>
      <h1 className={style["main-heading"]}>All Activities</h1>
      <Link to="/home" className={style.link}>
        <Button width="140px">
          Go Back{" "}
          <BiArrowBack size="1.5em" color="#fff" className={style.icon} />
        </Button>
      </Link>
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
    </Container>
  );
};

export default AllActivitiesContainer;
