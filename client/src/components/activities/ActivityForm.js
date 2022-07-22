import Input from "../UI/Form/Input";
import Button from "../UI/Form/Button";
import style from "./ActivityForm.module.css";

const ActivityForm = (props) => {
  return (
    <from className={style.form}>
      <div className={style["input-container"]}>
        <label htmlFor="activity">Select Activity</label>
        <select id="activity" name="activity" className={style.select}>
          <option value="running">Running</option>
          <option value="cycling">Cycling</option>
        </select>
      </div>
      <div className={style["input-container"]}>
        <label htmlFor="duration">Workout Duration (mins)</label>
        <Input
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
          id="date"
          placeholder="Date"
          type="datetime-local"
          margin="0"
          width="200px"
        />
      </div>
      <Button
        className={style.btn}
        label="ADD"
        width="80px"
        margin="20px auto"
        type="submit"
      />
    </from>
  );
};

export default ActivityForm;
