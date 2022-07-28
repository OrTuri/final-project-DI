import { useMap } from "react-leaflet";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  setModal,
  setModalTitle,
  setModalBody,
} from "../../features/modalSlice";
import Modal from "../UI/modal/Modal";

const FindCurrentLocation = () => {
  const dispatch = useDispatch();
  const map = useMap();
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (res) => {
        const { latitude, longitude } = res.coords;
        map.panTo([latitude, longitude]);
      },
      (err) => {
        dispatch(setModal(true));
        dispatch(setModalTitle("Attention! ⚠️"));
        dispatch(
          setModalBody(
            "You need to enable location permission in your browser in order for the map to be centered to your location"
          )
        );
      }
    );
  }, []);
  return null;
};

export default FindCurrentLocation;
