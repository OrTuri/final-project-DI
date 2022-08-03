import style from "./FoodResults.module.css";
import FoodCard from "./FoodCard";
import { useSelector } from "react-redux";
import Loader from "../loader/Loader";

const FoodResults = (props) => {
  const { loading } = useSelector((state) => state.nutrition);
  return (
    <>
      {loading && <Loader />}
      <div className={style.container}>
        {[...props.foods].reverse().map((food) => {
          return <FoodCard {...food} foodData={food} key={food.id} />;
        })}
      </div>
    </>
  );
};

export default FoodResults;
