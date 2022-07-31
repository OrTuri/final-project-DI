import style from "./SearchCard.module.css";
import { setReceiverUserId } from "../../features/messagesSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AiOutlineUser } from "react-icons/ai";

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
      <AiOutlineUser
        size="1em"
        color="#1C3879"
        style={{ position: "absolute", right: "0", marginRight: "10px" }}
      />
    </div>
  );
};

export default SearchCard;
