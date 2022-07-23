import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import GetPosition from "./GetPosition";
import style from "./MapMainContainer.module.css";
import { useSelector } from "react-redux";
import { BiRun } from "react-icons/bi";
import { BsBicycle } from "react-icons/bs";
import FlyToCard from "./FlyToCard";
import { useRef } from "react";
const MapMainContainer = (props) => {
  const markerRef = useRef();
  const { clickedLocation, cardLocation } = useSelector((state) => state.map);
  const { userActivities } = useSelector((state) => state.userData);
  return (
    <MapContainer
      className={style["map-container"]}
      center={[32.109333, 34.855499]}
      zoom={12}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {userActivities.map((activity) => {
        return (
          <Marker
            key={activity.activity_id}
            position={[
              Number(activity.location.split(",")[0]),
              Number(activity.location.split(",")[1]),
            ]}
          >
            <Popup>
              <div className={style.popup}>
                <div className={style["popup-heading"]}>
                  {activity.activity_name.slice(0, 1).toUpperCase() +
                    activity.activity_name.slice(1)}{" "}
                  {activity.activity_name === "running" ? (
                    <BiRun size="1.5em" color="#0096FF" />
                  ) : (
                    <BsBicycle size="1.5em" color="#EF5B0C" />
                  )}
                </div>
                <div className={style["popup-body"]}>
                  <p className={style["popup-date"]}>
                    {new Date(activity.date).toLocaleString("he-il", {
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
      })}
      {clickedLocation ? (
        <Marker position={clickedLocation} ref={markerRef}>
          <Popup>Add new activity</Popup>
        </Marker>
      ) : null}
      <GetPosition marker={markerRef} />
      {cardLocation && <FlyToCard coords={cardLocation} />}
    </MapContainer>
  );
};

export default MapMainContainer;
