import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import SetViewCurrentLocation from "./SetViewCurrentLocation";
import GetPosition from "./GetPosition";
import style from "./MapContainer.module.css";
import { useSelector } from "react-redux";

const MapMainContainer = (props) => {
  const { clickedLocation } = useSelector((state) => state.map);
  return (
    <MapContainer
      className={style["map-container"]}
      center={[32, 34]}
      zoom={11}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {clickedLocation.length > 0 ? (
        <Marker position={clickedLocation}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      ) : null}

      <SetViewCurrentLocation />
      <GetPosition />
    </MapContainer>
  );
};

export default MapMainContainer;
