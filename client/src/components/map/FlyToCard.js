import { useMap } from "react-leaflet";
import { useDispatch } from "react-redux";
import { setCardLocation } from "../../features/mapSlice";
import { useEffect } from "react";

const FlyToCard = ({ coords, marker }) => {
  const map = useMap();
  const dispatch = useDispatch();
  useEffect(() => {
    map.flyTo(coords);
    marker.openPopup();
    dispatch(setCardLocation(null));
  }, []);
  return null;
};

export default FlyToCard;
