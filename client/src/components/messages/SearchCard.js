import style from "./SearchCard.module.css";
import { setReceiverUserId } from "../../features/messagesSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const SearchCard = ({ label, id }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const clickHandler = () => {
    dispatch(setReceiverUserId(id));
    navigate("/home/messages/conversation");
  };
  return (
    <div className={style.container} onClick={clickHandler}>
      <p className={style.username}>{label}</p>
    </div>
  );
};

export default SearchCard;
