import style from "./FoodResults.module.css";
import FoodCard from "./FoodCard";

const FoodResults = (props) => {
  return (
    <div className={style.container}>
      {[...props.foods].reverse().map((food) => {
        return <FoodCard {...food} key={food.id} />;
      })}
    </div>
  );
};

export default FoodResults;
