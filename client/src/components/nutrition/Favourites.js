import style from "./Favourites.module.css";
import Container from "../UI/container/Container";
import Button from "../UI/Form/Button";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { getFavourites } from "../../features/nutritionSlice";
import { useDispatch, useSelector } from "react-redux";
import FoodCard from "./FoodCard";
import Loader from "../loader/Loader";
import Modal from "../UI/modal/Modal";
import { deleteFood } from "../../features/nutritionSlice";

const Favourites = () => {
  const { favourites, loading } = useSelector((state) => state.nutrition);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getFavourites());
  }, []);
  return (
    <>
      <Container>
        <h1 className={style["main-heading"]}>Favourite Foods</h1>
        <Link to="/home/nutrition" className={style.link}>
          <Button label="Go Back" width="100px" />
        </Link>
        {loading && <Loader />}
        <div className={style.container}>
          {favourites.map((food) => {
            return <FoodCard {...food} key={food.food_id} del />;
          })}
        </div>
      </Container>
    </>
  );
};

export default Favourites;
