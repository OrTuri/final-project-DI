import style from "./EditActivity.module.css";
import Button from "../UI/Form/Button";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Input from "../UI/Form/Input";
import { loadUserActivities } from "../../features/userDataSlice";
import { useEffect } from "react";
import {
  setValues,
  setClickedMap,
  updateActivity,
} from "../../features/editActivitySlice";
import {
  setMode,
  setCardLocation,
  setCardMarker,
} from "../../features/mapSlice";
import { Link } from "react-router-dom";
import Modal from "../UI/modal/Modal";

const EditActivity = (props) => {
  const { activityId } = useParams();
  const { markers } = useSelector((state) => state.userData);
  const marker = markers.find(
    (marker) => Number(marker.id) === Number(activityId)
  )?.marker;
  useEffect(() => {
    dispatch(setMode("edit"));
    if (marker) {
      dispatch(setCardMarker(marker));
    }
  });
  const { userActivities } = useSelector((state) => state.userData);
  const { editValues } = useSelector((state) => state.editActivity);
  const currentActivity = [...userActivities].find(
    (activity) => Number(activity.activity_id) === Number(activityId)
  );

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUserActivities());
    dispatch(setClickedMap(false));
  }, []);

  useEffect(() => {
    if (currentActivity) {
      dispatch(
        setValues({ name: "activity", value: currentActivity.activity_name })
      );
      dispatch(
        setValues({
          name: "duration",
          value: currentActivity.activity_duration,
        })
      );
      dispatch(setValues({ name: "date", value: currentActivity.date }));
      dispatch(
        setValues({
          name: "coords",
          value:
            String(Number(currentActivity.location.split(",")[0])) +
            "," +
            String(Number(currentActivity.location.split(",")[1])),
        })
      );
      dispatch(
        setCardLocation([
          Number(currentActivity.location.split(",")[0]),
          Number(currentActivity.location.split(",")[1]),
        ])
      );
    }
  }, [currentActivity]);

  const changeHandler = (e) => {
    dispatch(setValues({ name: e.target.name, value: e.target.value }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateActivity({ ...editValues, activityId: currentActivity.activity_id })
    );
  };

  return (
    <>
      <Modal btn1Label="Close" />
      <div className={style["main-container"]}>
        <Link to="/home/all" className={style.link}>
          <Button label="Go Back" width="100px" />
        </Link>
        <h1>Edit Activity</h1>
        <form className={style.form} onSubmit={submitHandler}>
          <div className={style["input-container"]}>
            <label htmlFor="activity">Select Activity</label>
            <select
              onChange={changeHandler}
              id="activity"
              name="activity"
              className={style.select}
              required
              value={editValues.activity}
            >
              <option value="" disabled>
                Activity
              </option>
              <option value="running">Running</option>
              <option value="cycling">Cycling</option>
            </select>
          </div>
          <div className={style["input-container"]}>
            <label htmlFor="duration">Workout Duration (mins)</label>
            <Input
              onChange={changeHandler}
              value={editValues.duration}
              required
              name="duration"
              id="duration"
              placeholder="30"
              type="number"
              margin="0"
              width="200px"
            />
          </div>
          <div className={style["input-container"]}>
            <label htmlFor="date">Workout Date and Time</label>
            <Input
              onChange={changeHandler}
              value={editValues.date}
              required
              name="date"
              id="date"
              placeholder="Date"
              type="datetime-local"
              margin="0"
              width="200px"
            />
          </div>
          <div className={style["input-container"]}>
            <label htmlFor="coords">Workout Location (click on the map)</label>
            <Input
              onChange={changeHandler}
              value={editValues.coords}
              required
              name="coords"
              id="coords"
              placeholder="Date"
              type="text"
              margin="0"
              width="200px"
            />
          </div>
          <div className={style.btn}>
            <Button
              label="UPDATE"
              width="100px"
              margin="20px auto"
              type="submit"
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default EditActivity;
