import style from "./Conversation.module.css";
import { Link } from "react-router-dom";
import Button from "../UI/Form/Button";
import Input from "../UI/Form/Input";
import { useSelector, useDispatch } from "react-redux";
import { setMessageValue, sendMessage } from "../../features/messagesSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Conversation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { messageValue, receiverUserId } = useSelector(
    (state) => state.messages
  );
  useEffect(() => {
    if (!receiverUserId) {
      navigate("/home/messages", { replace: true });
    }
  }, []);
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(sendMessage(messageValue));
  };
  return (
    <div className={style.container}>
      <h1 className={style["main-heading"]}>Conversation</h1>
      <Link to="/home/messages" className={style.link}>
        <Button label="Go Back" width="100px" />
      </Link>
      <div className={style["messages-container"]}>
        <div className={style["other-user-message"]}>
          <p>
            gsdfgdfsh dfgjkdsfgkdfsng dfgkdfgnjfghfg dfgjdfngkj g fsdgksjdaf
            gbsdfbsd jdfbgjr xvfdg
          </p>
          <p className={style["message-date"]}>sep 12, 2022, 16:57</p>
        </div>
        <div className={style["current-user-message"]}>
          <p>
            gsdfgdfsh dfgjkdsfgkdfsng dfgkdfgnjfghfg dfgjdfngkj g fsdgksjdaf
            gbsdfbsd jdfbgjr xvfdg
          </p>
          <p className={style["message-date"]}>sep 12, 2022, 16:57</p>
        </div>
      </div>
      <form className={style["send-message-form"]} onSubmit={submitHandler}>
        <Input
          required
          placeholder="Search users..."
          width="90%"
          value={messageValue}
          onChange={(e) => dispatch(setMessageValue(e.target.value))}
        />
        <Button color="#BF9742" type="submit" label="SEND" width="80px" />
      </form>
    </div>
  );
};

export default Conversation;
