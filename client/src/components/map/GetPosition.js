import { useMap } from "react-leaflet";
import { useDispatch } from "react-redux";
import { setClickedLocation } from "../../features/mapSlice";

const GetPosition = (props) => {
  const dispatch = useDispatch();
  const map = useMap();
  map.on("click", (res) => {
    const latLng = [res.latlng.lat, res.latlng.lng];
    dispatch(setClickedLocation(latLng));
  });
  return null;
};

export default GetPosition;
