import style from "./ActivityCard.module.css";
import { BiRun } from "react-icons/bi";
import { BsBicycle } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { setCardLocation, setCardMarker } from "../../features/mapSlice";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import {
  setModal,
  setModalTitle,
  setModalBody,
} from "../../features/modalSlice";
import Modal from "../UI/modal/Modal";

const ActivityCard = (props) => {
  const { markers } = useSelector((state) => state.userData);
  const marker = markers.find((marker) => marker.id === props.id)?.marker;
  const dispatch = useDispatch();
  let icon = null;
  const deleteActivity = (e) => {
    e.stopPropagation();
    dispatch(setModal(true));
    dispatch(setModalTitle("DELETE ACTIVITY ⚠️"));
    dispatch(setModalBody("Are you sure you want to delete?"));
  };
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
    <>
      <Modal twoButtons btn1Label="NO" btn2Label="YES" />
      <div
        className={style["main-container"]}
        onClick={() => {
          dispatch(setCardLocation(props.coords));
          dispatch(setCardMarker(marker));
        }}
      >
        <div className={style["heading-container"]}>
          <h4 className={style.activity}>{props.activity}</h4>
          {icon}
          {props.showBtns && (
            <div className={style["btns-container"]}>
              <button className={style["del-btn"]} onClick={deleteActivity}>
                <AiFillDelete size="1.5em" color="#fff" />
              </button>
              <button className={style["edit-btn"]}>
                <AiFillEdit size="1.5em" color="#fff" />
              </button>
            </div>
          )}
        </div>
        <div className={style.details}>
          <p className={style.calories}>{props.calories} calories</p>
          <p className={style.duration}>{props.duration} mins</p>
          <p className={style.date}>
            {new Date(props.date).toLocaleString("he-il", {
              year: "2-digit",
              month: "2-digit",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>
      </div>
    </>
  );
};

export default ActivityCard;
