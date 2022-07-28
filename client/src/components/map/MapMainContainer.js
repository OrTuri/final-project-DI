import { MapContainer, TileLayer, ZoomControl } from "react-leaflet";
import GetPosition from "./GetPosition";
import style from "./MapMainContainer.module.css";
import { useSelector } from "react-redux";
import FlyToCard from "./FlyToCard";
import CustomMarker from "./CustomMarker";
import FindCurrentLocation from "./FindCurrentLocation";
const MapMainContainer = (props) => {
  const { cardLocation, cardMarker } = useSelector((state) => state.map);
  const { userActivities } = useSelector((state) => state.userData);
  const { modalZoomControl } = useSelector((state) => state.modal);
  return (
    <MapContainer
      className={style["map-container"]}
      center={[32.109333, 34.855499]}
      zoom={12}
      scrollWheelZoom={true}
      zoomControl={false}
    >
      {modalZoomControl ? <ZoomControl position="topleft" /> : null}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {userActivities.map((activity) => {
        return <CustomMarker {...activity} key={activity.activity_id} />;
      })}
      <GetPosition />
      {cardLocation && cardMarker && (
        <FlyToCard coords={cardLocation} marker={cardMarker} />
      )}
      <FindCurrentLocation />
    </MapContainer>
  );
};

export default MapMainContainer;
