import style from "./NutritionContainer.module.css";
import Container from "../UI/container/Container";
import Button from "../UI/Form/Button";
import { Link } from "react-router-dom";
import NutritionSearchForm from "./NutritionSearchForm";

const NutritionContainer = () => {
  return (
    <Container>
      <h1 className={style["main-heading"]}>Nutrition</h1>
      <Link to="/home" className={style.link}>
        <Button label="Go Back" width="100px" />
      </Link>
      <NutritionSearchForm />
    </Container>
  );
};

export default NutritionContainer;
