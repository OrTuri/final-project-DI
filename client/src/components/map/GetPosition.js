import { useMap, Marker, Popup } from "react-leaflet";
import { useDispatch, useSelector } from "react-redux";
import { setClickedLocation } from "../../features/mapSlice";
import { useRef, useEffect } from "react";
import mapIcon from "../../red-map-icon.png";
import * as L from "leaflet";
import { setEditLocation } from "../../features/editActivitySlice";

const GetPosition = (props) => {
  const leafIcon = L.Icon.extend({ options: {} });
  const redIcon = new leafIcon({
    iconUrl: mapIcon,
    iconSize: [30],
    iconAnchor: [18, 50],
    popupAnchor: [-4, -45],
  });
  const dispatch = useDispatch();
  const map = useMap();
  const { clickedLocation, mode } = useSelector((state) => state.map);
  const { editLocation } = useSelector((state) => state.editActivity);
  const markerRef = useRef();
  useEffect(() => {
    if (mode === "add") {
      if (clickedLocation && mode === "add") {
        map.flyTo(clickedLocation);
      }
    } else {
      if (editLocation) {
        map.flyTo(editLocation);
      }
    }
    setTimeout(() => {
      if (markerRef.current) {
        markerRef.current.openPopup();
      }
    }, 100);
  });
  map.on("click", (res) => {
    const latLng = [res.latlng.lat, res.latlng.lng];
    if (mode === "add") {
      dispatch(setClickedLocation(latLng));
    } else {
      dispatch(setEditLocation(latLng));
    }
  });
  if (!clickedLocation) return null;
  return (
    <Marker position={clickedLocation} ref={markerRef} icon={redIcon}>
      <Popup>{mode === "add" ? "Add new activity" : "Edit Activity"}</Popup>
    </Marker>
  );
};

export default GetPosition;
