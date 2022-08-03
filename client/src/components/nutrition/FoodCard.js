import style from "./FoodCard.module.css";
import Button from "../UI/Form/Button";
import { AiFillSave } from "react-icons/ai";
import { BsFillTrashFill } from "react-icons/bs";
import { saveFood, deleteFood } from "../../features/nutritionSlice";
import { useDispatch } from "react-redux";
import {
  setModal,
  setModalTitle,
  setModalBody,
  resetModal,
} from "../../features/modalSlice";
import Modal from "../UI/modal/Modal";

const FoodCard = (props) => {
  const dispatch = useDispatch();
  const saveHandler = () => {
    dispatch(saveFood(props.foodData));
  };
  const deleteHandler = () => {
    dispatch(setModal(true));
    dispatch(setModalTitle("Are you sure? ⚠️"));
    dispatch(setModalBody("This will delete the food data"));
  };
  const onDelete = () => {
    dispatch(deleteFood(props.food_id));
    dispatch(resetModal());
  };
  return (
    <>
      <Modal twoButtons btn1Label="NO" btn2Label="YES" onClick={onDelete} />
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
          label={
            props.del ? (
              <BsFillTrashFill size="1.5em" color="#B25068" />
            ) : (
              <AiFillSave size="1.7em" />
            )
          }
          width="50px"
          color="#94B49F"
          margin="0"
          onClick={props.del ? deleteHandler : saveHandler}
        />
      </div>
    </>
  );
};

export default FoodCard;
