import style from "./HomePage.module.css";
import { useSelector } from "react-redux";
import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import { useEffect, useState } from "react";
import SetViewCurrentLocation from "../components/map/SetViewCurrentLocation";
import GetPosition from "../components/map/GetPosition";

const HomePage = (props) => {
  const { userDetails } = useSelector((state) => state.userData);
  return (
    <section className={style["main-container"]}>
      <div className={style["activities-container"]}>
        <h1>Welcome {userDetails.fullName.split(" ")[0]}!</h1>
        <h3>Your recent activities:</h3>
      </div>
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
        <Marker position={[31, 35]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
        <SetViewCurrentLocation />
        <GetPosition />
      </MapContainer>
    </section>
  );
};

export default HomePage;
