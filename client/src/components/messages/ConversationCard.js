import style from "./ConversationCard.module.css";
import { BiMessageAltDetail } from "react-icons/bi";
import { setReceiverUserId } from "../../features/messagesSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BsFillTrashFill } from "react-icons/bs";

const ConversationCard = ({ username, message, user_id, date }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const clickHandler = () => {
    dispatch(setReceiverUserId(user_id));
    navigate("/home/messages/conversation");
  };
  return (
    <div className={style.container} onClick={clickHandler}>
      <BiMessageAltDetail size="1.2em" color="#5BB318" />
      <div className={style["username-date-container"]}>
        <p className={style.username}>{username}</p>
        <p className={style.date}>{new Date(date).toLocaleString("he-il")}</p>
      </div>
      <p className={style.message}>{message}</p>
    </div>
  );
};

export default ConversationCard;
