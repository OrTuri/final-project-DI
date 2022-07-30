import style from "./SearchCard.module.css";

const SearchCard = ({ label, id }) => {
  const clickHandler = () => {
    console.log(label, id);
  };
  return (
    <div className={style.container} onClick={clickHandler}>
      <p className={style.username}>{label}</p>
    </div>
  );
};

export default SearchCard;
