import { Marker, Popup, useMap } from "react-leaflet";
import { BiRun } from "react-icons/bi";
import { BsBicycle } from "react-icons/bs";
import style from "./CustomMarker.module.css";
import { useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addMarkers } from "../../features/userDataSlice";
const CustomMarker = (props) => {
  const dispatch = useDispatch();
  const markerRef = useRef();
  useEffect(() => {
    dispatch(
      addMarkers({
        id: props.activity_id,
        marker: markerRef.current,
      })
    );
  }, []);
  return (
    <Marker
      ref={markerRef}
      key={props.activity_id}
      position={[
        Number(props.location.split(",")[0]),
        Number(props.location.split(",")[1]),
      ]}
    >
      <Popup>
        <div className={style.popup}>
          <div className={style["popup-heading"]}>
            {props.activity_name.slice(0, 1).toUpperCase() +
              props.activity_name.slice(1)}{" "}
            {props.activity_name === "running" ? (
              <BiRun size="1.5em" color="#0096FF" />
            ) : (
              <BsBicycle size="1.5em" color="#EF5B0C" />
            )}
          </div>
          <div className={style["popup-body"]}>
            <p className={style["popup-date"]}>
              {new Date(props.date).toLocaleString("he-il", {
                year: "2-digit",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
        </div>
      </Popup>
    </Marker>
  );
};

export default CustomMarker;
