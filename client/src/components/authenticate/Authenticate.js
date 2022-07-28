import { Navigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { setUserDetails } from "../../features/userDataSlice";
import { useDispatch } from "react-redux";
import { setNavigateLogin } from "../../features/authenticationSlice";

const Authenticate = ({ children }) => {
  const dispatch = useDispatch();
  const [isAuthorized, setIsAuthorized] = useState(null);
  useEffect(() => {
    axios({ url: "/auth", method: "POST" })
      .then((res) => {
        setIsAuthorized(true);
        const { username, fullName, bmr, userId } = res.data;
        dispatch(
          setUserDetails({ username, fullName, bmr: Number(bmr), userId })
        );
      })
      .catch((err) => {
        setIsAuthorized(false);
        dispatch(setNavigateLogin(true));
      });
  }, [dispatch]);

  if (isAuthorized === null) {
    return null;
  }

  return isAuthorized ? children : <Navigate to="/login" replace={true} />;
};

export default Authenticate;
