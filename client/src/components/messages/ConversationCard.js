import style from "./ConversationCard.module.css";
import { BiMessageAltDetail } from "react-icons/bi";
import {
  setReceiverUserId,
  deleteMessages,
  setDeleteReceiverId,
} from "../../features/messagesSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BsFillTrashFill } from "react-icons/bs";
import {
  setModal,
  setModalBody,
  setModalTitle,
  resetModal,
} from "../../features/modalSlice";
import Modal from "../UI/modal/Modal";

const ConversationCard = ({ username, message, user_id, date }) => {
  const { deleteReceiverId } = useSelector((state) => state.messages);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const clickHandler = () => {
    dispatch(setReceiverUserId(user_id));
    navigate("/home/messages/conversation");
  };
  const deleteHandler = (e) => {
    e.stopPropagation();
    dispatch(setDeleteReceiverId(user_id));
    dispatch(setModal(true));
    dispatch(setModalTitle("Are you sure? ⚠️"));
    dispatch(setModalBody("This action will delete your conversation"));
  };
  const onDeleteMessages = () => {
    dispatch(deleteMessages(deleteReceiverId));
    dispatch(setDeleteReceiverId(null));
    dispatch(resetModal());
  };
  return (
    <>
      <Modal
        btn1Label="NO"
        btn2Label="YES"
        twoButtons
        onClick={onDeleteMessages}
      />
      <div className={style.container} onClick={clickHandler}>
        <div className={style["icons-container"]}>
          <BiMessageAltDetail size="1.2em" color="#5BB318" />
          <BsFillTrashFill color="#EB1D36" onClick={deleteHandler} />
        </div>
        <div className={style["username-date-container"]}>
          <p className={style.username}>{username}</p>
          <p className={style.date}>{new Date(date).toLocaleString("he-il")}</p>
        </div>
        <p className={style.message}>{message}</p>
      </div>
    </>
  );
};

export default ConversationCard;
