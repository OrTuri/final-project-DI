import { marker } from "leaflet";
import { useMap } from "react-leaflet";
import { useDispatch } from "react-redux";
import { setClickedLocation } from "../../features/mapSlice";

const GetPosition = (props) => {
  const dispatch = useDispatch();
  const map = useMap();
  let latLng = [];
  map.on("click", (res) => {
    latLng = [res.latlng.lat, res.latlng.lng];
    dispatch(setClickedLocation(latLng));
    map.panTo(latLng);
    setTimeout(() => {
      props.marker.current.openPopup();
    }, 100);
  });
  return null;
};

export default GetPosition;
