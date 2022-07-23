import { useMap } from "react-leaflet";
import { useDispatch } from "react-redux";
import { setCardLocation } from "../../features/mapSlice";
import { useEffect } from "react";

const FlyToCard = ({ coords }) => {
  const map = useMap();
  map.flyTo(coords);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setCardLocation(null));
  }, []);
  return null;
};

export default FlyToCard;
