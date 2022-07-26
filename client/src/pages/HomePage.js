import style from "./HomePage.module.css";
import MapMainContainer from "../components/map/MapMainContainer";
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
