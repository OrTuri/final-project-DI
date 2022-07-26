import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import GetPosition from "./GetPosition";
import style from "./MapMainContainer.module.css";
import { useSelector } from "react-redux";
import FlyToCard from "./FlyToCard";
import { useRef } from "react";
import CustomMarker from "./CustomMarker";
const MapMainContainer = (props) => {
  const markerRef = useRef();
  const { clickedLocation, cardLocation, cardMarker } = useSelector(
    (state) => state.map
  );
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
        return <CustomMarker {...activity} key={activity.activity_id} />;
      })}
      {clickedLocation ? (
        <Marker position={clickedLocation} ref={markerRef}>
          <Popup>Add new activity</Popup>
        </Marker>
      ) : null}
      <GetPosition marker={markerRef} />
      {cardLocation && <FlyToCard coords={cardLocation} marker={cardMarker} />}
    </MapContainer>
  );
};

export default MapMainContainer;
