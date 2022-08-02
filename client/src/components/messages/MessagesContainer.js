import style from "./MessagesContainer.module.css";
import Container from "../UI/container/Container";
import Button from "../UI/Form/Button";
import Input from "../UI/Form/Input";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import {
  setSearchValue,
  searchUsers,
  setMessages,
  getRecentMessages,
  resetSearchUsersList,
} from "../../features/messagesSlice";
import { useSelector, useDispatch } from "react-redux";
import SearchCard from "./SearchCard";
import RecentConversations from "./RecentConversations";
import { useEffect } from "react";
import { loadUserActivities } from "../../features/userDataSlice";

const MessagesContainer = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setMessages([]));
    const getRecentMessagesInterval = setInterval(() => {
      dispatch(getRecentMessages());
    }, 10000);
    dispatch(loadUserActivities());
    return () => {
      clearInterval(getRecentMessagesInterval);
      dispatch(resetSearchUsersList());
    };
  }, []);
  const { searchValue, searchUsersList } = useSelector(
    (state) => state.messages
  );
  const searchSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(searchUsers());
  };
  return (
    <Container>
      <h1 className={style["main-heading"]}>Messages</h1>
      <Link to="/home" className={style.link}>
        <Button label="Go Back" width="100px" />
      </Link>
      <form
        className={style["search-users-form"]}
        onSubmit={searchSubmitHandler}
      >
        <label>Search users</label>
        <div className={style.inputs}>
          <Input
            margin="0"
            placeholder="Leave empty to see all users"
            value={searchValue}
            onChange={(e) => {
              dispatch(setSearchValue(e.target.value));
            }}
          />
          <Button
            margin="0"
            label={<FaSearch />}
            width="50px"
            color="#3AB0FF"
            type="submit"
          />
        </div>
      </form>
      {searchUsersList.length > 0 && (
        <div className={style["search-results"]}>
          {searchUsersList.map(({ username, user_id: id }, index) => (
            <SearchCard key={id} label={username} id={id} />
          ))}
        </div>
      )}
      <RecentConversations />
    </Container>
  );
};

export default MessagesContainer;
