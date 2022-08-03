import style from "./ActivitiesContainer.module.css";
import { useSelector, useDispatch } from "react-redux";
import Container from "../UI/container/Container";
import ActivityForm from "./ActivityForm";
import { loadUserActivities } from "../../features/userDataSlice";
import { useEffect } from "react";
import RecentActivities from "./RecentActivities";
import Button from "../UI/Form/Button";
import { Link } from "react-router-dom";
import { setMode } from "../../features/mapSlice";
import axios from "axios";
import { setNavigateLogin, setToken } from "../../features/authenticationSlice";
import Loader from "../loader/Loader";
import { AiFillMessage } from "react-icons/ai";
import { BiRun } from "react-icons/bi";
import { MdFastfood } from "react-icons/md";
import { RiLogoutBoxLine } from "react-icons/ri";

const ActivitiesContainer = (props) => {
  const { userDetails, loading } = useSelector((state) => state.userData);
  const { clickedLocation } = useSelector((state) => state.map);
  const dispatch = useDispatch();
  const onLogout = async () => {
    await axios({
      url: `${process.env.REACT_APP_PROXY || ""}/logout`,
      method: "POST",
      withCredentials: true,
    });
    dispatch(setNavigateLogin(true));
    dispatch(setToken(""));
  };
  useEffect(() => {
    dispatch(setMode("add"));
  });
  useEffect(() => {
    dispatch(loadUserActivities());
  }, [dispatch]);
  return (
    <Container>
      <h1 className={style["main-heading"]}>
        Welcome {userDetails.fullName.split(" ")[0]}!
      </h1>
      <div className={style["heading-container"]}>
        <div className={style.btn}>
          <Link to="/home/all" className={style.link}>
            <Button color="#EC994B" width="160px" margin="0">
              <span className={style.nav}>All Activities</span>
              <BiRun size="1.5em" color="#0096ff" className={style.icon} />
            </Button>
          </Link>
        </div>
        <Link to="/home/messages" className={style.link}>
          <Button color="#EF5B0C" width="160px" margin="0">
            <span className={style.nav}>Messages</span>
            <AiFillMessage
              size="1.5em"
              color="#59CE8F"
              className={style.icon}
            />
          </Button>
        </Link>
        <Link to="/home/nutrition" className={style.link}>
          <Button color="#1C3879" width="160px" margin="0">
            <span className={style.nav}>Nutrition</span>
            <MdFastfood size="1.5em" color="#D6EFED" className={style.icon} />
          </Button>
        </Link>
      </div>
      {!clickedLocation && (
        <h2 className={style["add-activity-title"]}>
          Click on the map to add an activity
        </h2>
      )}
      {clickedLocation && <ActivityForm />}
      <RecentActivities />
      {loading && <Loader />}
      <Link to="" className={`${style.link} ${style.logout}`}>
        <Button color="#EB1D36" width="140px" onClick={onLogout}>
          <span className={style.nav}>LOGOUT</span>
          <RiLogoutBoxLine
            size="1.5em"
            color="#D6EFED"
            className={style.icon}
          />
        </Button>
      </Link>
    </Container>
  );
};

export default ActivitiesContainer;
