import { useMap, setView, getZoom } from "react-leaflet";
import { useState, useEffect } from "react";

const SetViewCurrentLocation = (props) => {
  const [location, setLocation] = useState({
    latLng: [31, 35],
    zoom: 6,
  });
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const { longitude, latitude } = coords;
        setLocation({ latLng: [latitude, longitude], zoom: 15 });
      },
      (err) => {
        console.log(err);
      }
    );
  }, []);
  const map = useMap();
  map.setView(location.latLng, location.zoom);
  return null;
};

export default SetViewCurrentLocation;
