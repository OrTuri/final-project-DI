import style from "./NutritionContainer.module.css";
import Container from "../UI/container/Container";
import Button from "../UI/Form/Button";
import { Link } from "react-router-dom";
import NutritionSearchForm from "./NutritionSearchForm";
import FoodResults from "./FoodResults";
import { useSelector } from "react-redux";
import Modal from "../UI/modal/Modal";
import { BiArrowBack } from "react-icons/bi";
import { MdFavorite } from "react-icons/md";

const NutritionContainer = () => {
  const { searchResults } = useSelector((state) => state.nutrition);
  return (
    <>
      <Modal btn1Label="Close" />
      <Container>
        <h1 className={style["main-heading"]}>Nutrition</h1>
        <div className={style["btns-container"]}>
          <Link to="/home" className={style.link}>
            <Button width="140px">
              Go Back{" "}
              <BiArrowBack size="1.5em" color="#fff" className={style.icon} />
            </Button>
          </Link>
          <Link to="/home/nutrition/favourites" className={style.link}>
            <Button width="140px" color="#0096FF" margin="0">
              Favourites{" "}
              <MdFavorite size="1.5em" color="#FF7396" className={style.icon} />
            </Button>
          </Link>
        </div>
        <NutritionSearchForm />
        <FoodResults foods={searchResults} />
      </Container>
    </>
  );
};

export default NutritionContainer;
