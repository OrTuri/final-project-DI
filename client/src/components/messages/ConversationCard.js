import style from "./ConversationCard.module.css";
import { BiMessageAltDetail } from "react-icons/bi";

const ConversationCard = ({ username, message }) => {
  return (
    <div className={style.container}>
      <BiMessageAltDetail size="1.2em" color="#5BB318" />
      <p className={style.username}>{username}</p>
      <p className={style.message}>{message}</p>
    </div>
  );
};

export default ConversationCard;
