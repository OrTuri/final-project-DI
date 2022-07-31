import style from "./RecentConversations.module.css";
import ConversationCard from "./ConversationCard";
import { getRecentMessages } from "../../features/messagesSlice";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

const RecentConversations = () => {
  const dispatch = useDispatch();
  const { recentMessages } = useSelector((state) => state.messages);
  useEffect(() => {
    dispatch(getRecentMessages());
  }, []);
  return (
    <div className={style.container}>
      {recentMessages.map((message) => {
        return (
          <ConversationCard
            {...message}
            key={message.messages_id}
            username={message.username}
            message={message.message_content}
          />
        );
      })}
    </div>
  );
};

export default RecentConversations;
