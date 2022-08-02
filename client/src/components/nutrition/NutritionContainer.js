import style from "./NutritionContainer.module.css";
import Container from "../UI/container/Container";
import Button from "../UI/Form/Button";
import { Link } from "react-router-dom";
import NutritionSearchForm from "./NutritionSearchForm";
import FoodResults from "./FoodResults";
import { useSelector } from "react-redux";
import Modal from "../UI/modal/Modal";

const NutritionContainer = () => {
  const { searchResults } = useSelector((state) => state.nutrition);
  return (
    <>
      <Modal btn1Label="Close" />
      <Container>
        <h1 className={style["main-heading"]}>Nutrition</h1>
        <Link to="/home" className={style.link}>
          <Button label="Go Back" width="100px" />
        </Link>
        <Link to="/home/nutrition/favourits" className={style.link}>
          <Button label="Favourites" width="100px" color="#0096FF" margin="0" />
        </Link>
        <NutritionSearchForm />
        <FoodResults foods={searchResults} />
      </Container>
    </>
  );
};

export default NutritionContainer;
