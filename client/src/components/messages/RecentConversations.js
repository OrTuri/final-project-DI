import style from "./RecentConversations";
import ConversationCard from "./ConversationCard";
import { getRecentMessages } from "../../features/messagesSlice";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

const RecentConversations = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getRecentMessages());
  }, []);
  return (
    <div className={style.container}>
      <ConversationCard
        username="dana101"
        message="gfhdgfhdfgdfgf sdfhdjfbsdf sdjhfbsdjf jhsdfbsdfghjhgj  dfgjfdngjkdf  dfgnjdfgdfjgl"
      />
    </div>
  );
};

export default RecentConversations;
