import style from "./NutritionSearchForm.module.css";
import Button from "../UI/Form/Button";
import Input from "../UI/Form/Input";
import { FaSearch } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import {
  setSearchValues,
  resetSearchValues,
} from "../../features/nutritionSlice";

const NutritionSearchForm = () => {
  const dispatch = useDispatch();
  const { searchValues } = useSelector((state) => state.nutrition);
  const submitHandler = (e) => {
    e.preventDefault();
    console.log(searchValues);
    dispatch(resetSearchValues());
  };
  return (
    <form className={style.form} onSubmit={submitHandler}>
      <div>
        <label htmlFor="foodInput">Food</label>
        <Input
          required
          margin="0"
          placeholder="Banana"
          id="foodInput"
          width="auto"
          value={searchValues.food}
          onChange={(e) => {
            dispatch(setSearchValues({ name: "food", value: e.target.value }));
          }}
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
          value={searchValues.grams}
          onChange={(e) => {
            dispatch(setSearchValues({ name: "grams", value: e.target.value }));
          }}
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
  );
};

export default NutritionSearchForm;
