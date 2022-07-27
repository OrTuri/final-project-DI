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
  resetModal,
} from "../../features/modalSlice";
import Modal from "../UI/modal/Modal";
import { deleteUserActivity } from "../../features/deleteActivitySlice";
import { setCurrentActivityId } from "../../features/deleteActivitySlice";
import { Link } from "react-router-dom";

const ActivityCard = (props) => {
  const { markers } = useSelector((state) => state.userData);
  const { currentActivityId } = useSelector((state) => state.deleteActivity);
  const marker = markers.find((marker) => marker.id === props.id)?.marker;
  const dispatch = useDispatch();
  let icon = null;
  const onClickDeleteActivityBtn = (e) => {
    e.stopPropagation();
    dispatch(setCurrentActivityId(props.id));
    dispatch(setModal(true));
    dispatch(setModalTitle("DELETE ACTIVITY ⚠️"));
    dispatch(setModalBody("Are you sure you want to delete?"));
  };

  const deleteActivity = () => {
    dispatch(deleteUserActivity(currentActivityId));
    dispatch(resetModal());
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
      <Modal
        twoButtons
        btn1Label="NO"
        btn2Label="YES"
        onClick={deleteActivity}
      />
      <div
        className={style["main-container"]}
        onClick={() => {
          dispatch(setCardLocation(props.coords));
          dispatch(setCardMarker(marker));
        }}
      >
        <div className={style["heading-container"]}>
          <h4 className={style.activity}>
            {props.activity.at(0).toUpperCase() + props.activity.slice(1)}
          </h4>
          {icon}
          {props.showBtns && (
            <div className={style["btns-container"]}>
              <button
                className={style["del-btn"]}
                onClick={onClickDeleteActivityBtn}
              >
                <AiFillDelete size="1.5em" color="#fff" />
              </button>
              <Link to={`/home/edit/${props.id}`}>
                <button className={style["edit-btn"]}>
                  <AiFillEdit size="1.5em" color="#fff" />
                </button>
              </Link>
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
