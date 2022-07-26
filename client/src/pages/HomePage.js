import style from "./HomePage.module.css";
import MapMainContainer from "../components/map/MapMainContainer";
import ActivitiesContainer from "../components/activities/ActivitiesContainer";
import AllActivities from "../components/activities/AllActivities";
import { Outlet } from "react-router-dom";

const HomePage = (props) => {
  return (
    <section className={style["main-container"]}>
      <Outlet />
      <MapMainContainer />
    </section>
  );
};

export default HomePage;
