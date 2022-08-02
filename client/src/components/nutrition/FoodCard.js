import style from "./FoodCard.module.css";
import Button from "../UI/Form/Button";
import { AiFillSave } from "react-icons/ai";
import { saveFood } from "../../features/nutritionSlice";
import { useDispatch } from "react-redux";

const FoodCard = (props) => {
  const dispatch = useDispatch();
  const clickHandler = () => {
    dispatch(saveFood(props.foodData));
  };
  return (
    <div className={style.container}>
      <h4 className={style.heading}>{`${props.name
        .at(0)
        .toUpperCase()}${props.name.slice(1)}`}</h4>
      <img className={style.img} src={props.imgSrc} alt="delicious food" />
      <div className={style["details-container"]}>
        <p className={style.detail}>
          <span className={style.bold}>Weight:</span> {props.grams} Grams
        </p>
        <p className={style.detail}>
          <span className={style.bold}>Calories:</span> {props.calories}
        </p>
        <p className={style.detail}>
          <span className={style.bold}>Protein:</span> {props.protein} grams
        </p>
        <p className={style.detail}>
          <span className={style.bold}>Fats:</span> {props.fat} grams
        </p>
      </div>
      <Button
        label={<AiFillSave size="1.7em" />}
        width="50px"
        color="#94B49F"
        margin="0"
        onClick={clickHandler}
      />
    </div>
  );
};

export default FoodCard;
