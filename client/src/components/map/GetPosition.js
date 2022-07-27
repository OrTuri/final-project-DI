import { useMap, Marker, Popup } from "react-leaflet";
import { useDispatch, useSelector } from "react-redux";
import { setClickedLocation } from "../../features/mapSlice";
import { useRef, useEffect } from "react";
import mapIcon from "../../red-map-icon.png";
import * as L from "leaflet";
import { setValues, setClickedMap } from "../../features/editActivitySlice";

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
  const { editValues, clickedMap } = useSelector((state) => state.editActivity);
  const markerRef = useRef();
  const editCoords = editValues.coords
    ? [
        Number(editValues.coords.split(",")[0]),
        Number(editValues.coords.split(",")[1]),
      ]
    : null;
  useEffect(() => {
    if (mode === "add") {
      if (clickedLocation && mode === "add") {
        map.flyTo(clickedLocation);
      }
    } else {
      if (editCoords) {
        map.flyTo(editCoords);
      }
    }
    setTimeout(() => {
      if (markerRef.current) {
        markerRef.current.openPopup();
      }
    }, 100);
  });
  map.on("click", (res) => {
    dispatch(setClickedMap(true));
    const latLng = [res.latlng.lat, res.latlng.lng];
    if (mode === "add") {
      dispatch(setClickedLocation(latLng));
    } else {
      dispatch(
        setValues({
          name: "coords",
          value: `${latLng[0].toString()},${latLng[1].toString()}`,
        })
      );
    }
  });
  if (
    (mode === "add" && !clickedLocation) ||
    (mode === "edit" && !clickedMap)
  ) {
    return null;
  }
  return (
    <Marker
      position={mode === "add" ? clickedLocation : editCoords}
      ref={markerRef}
      icon={redIcon}
    >
      <Popup>{mode === "add" ? "Add new activity" : "Edit Activity"}</Popup>
    </Marker>
  );
};

export default GetPosition;
