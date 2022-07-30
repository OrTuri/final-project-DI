import style from "./MessagesContainer.module.css";
import Button from "../UI/Form/Button";
import Input from "../UI/Form/Input";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { setSearchValue, searchUsers } from "../../features/messagesSlice";
import { useSelector, useDispatch } from "react-redux";
import SearchCard from "./SearchCard";

const MessagesContainer = () => {
  const dispatch = useDispatch();
  const { searchValue, searchUsersList } = useSelector(
    (state) => state.messages
  );
  const searchSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(searchUsers());
  };
  return (
    <div className={style["messages-container"]}>
      <h1 className={style["main-heading"]}>Messages</h1>
      <Link to="/home" className={style.link}>
        <Button label="Go Back" width="100px" />
      </Link>
      <form
        className={style["search-users-form"]}
        onSubmit={searchSubmitHandler}
      >
        <Input
          required
          placeholder="Search users..."
          value={searchValue}
          onChange={(e) => {
            dispatch(setSearchValue(e.target.value));
          }}
        />
        <Button
          label={<FaSearch />}
          width="50px"
          color="#3AB0FF"
          type="submit"
        />
      </form>
      {searchUsersList.map(({ username, user_id: id }, index) => (
        <SearchCard key={id} label={username} id={id} />
      ))}

      <p className={style["no-messages-paragraph"]}>
        You currently have no messages...
      </p>
    </div>
  );
};

export default MessagesContainer;
