import style from "./ActivityCard.module.css";
import { BiRun } from "react-icons/bi";
import { BsBicycle } from "react-icons/bs";

const ActivityCard = (props) => {
  let icon = null;
  switch (props.activity) {
    case "running":
      icon = <BiRun size="1.5em" color="#0096FF" />;
      break;
    case "cycling":
      icon = <BsBicycle size="1.5em" color="#EF5B0C" />;
      break;
    default:
      icon = null;
      break;
  }
  return (
    <div className={style["main-container"]}>
      <div className={style["heading-container"]}>
        <h4 className={style.activity}>{props.activity}</h4>
        {icon}
      </div>
      <div className={style.details}>
        <p className={style.calories}>{props.calories} calories</p>
        <p className={style.duration}>{props.duration} mins</p>
        <p className={style.date}>{props.date}</p>
      </div>
    </div>
  );
};

export default ActivityCard;
