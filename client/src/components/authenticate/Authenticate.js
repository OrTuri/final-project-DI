import { Navigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { setUserDetails } from "../../features/userDataSlice";
import { useDispatch, useSelector } from "react-redux";

const Authenticate = ({ children }) => {
  const { userDetails } = useSelector((state) => state.userData);
  const dispatch = useDispatch();
  const [isAuthorized, setIsAuthorized] = useState(null);
  useEffect(() => {
    axios({ url: "/auth", method: "POST" })
      .then((res) => {
        setIsAuthorized(true);
        if (Object.keys(userDetails).length < 1) {
          const { username, fullName, bmr } = res.data;
          dispatch(setUserDetails({ username, fullName, bmr: Number(bmr) }));
        }
      })
      .catch((err) => setIsAuthorized(false));
  }, []);

  if (isAuthorized === null) {
    return null;
  }

  return isAuthorized ? children : <Navigate to="/login" replace={true} />;
};

export default Authenticate;
