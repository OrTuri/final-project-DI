import style from "./HomePage.module.css";
import MapMainContainer from "../components/map/MapMainContainer";
import ActivitiesContainer from "../components/activities/ActivitiesContainer";

const HomePage = (props) => {
  return (
    <section className={style["main-container"]}>
      <ActivitiesContainer />
      <MapMainContainer />
    </section>
  );
};

export default HomePage;
