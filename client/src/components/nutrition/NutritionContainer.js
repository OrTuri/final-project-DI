import style from "./NutritionContainer.module.css";
import Container from "../UI/container/Container";
import Button from "../UI/Form/Button";
import Input from "../UI/Form/Input";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

const NutritionContainer = () => {
  return (
    <Container>
      <h1 className={style["main-heading"]}>Nutrition</h1>
      <Link to="/home" className={style.link}>
        <Button label="Go Back" width="100px" />
      </Link>
      <form className={style.form}>
        <div>
          <label htmlFor="foodInput">Food</label>
          <Input
            required
            margin="0"
            placeholder="Banana"
            id="foodInput"
            width="auto"
          />
        </div>
        <div>
          <label htmlFor="gramsInput">Grams</label>
          <Input
            type="number"
            required
            margin="0"
            placeholder="100"
            id="gramsInput"
            width="auto"
          />
        </div>
        <Button
          margin="0"
          width="50px"
          color="#DF7861"
          label={<FaSearch />}
          type="submit"
        />
      </form>
    </Container>
  );
};

export default NutritionContainer;
