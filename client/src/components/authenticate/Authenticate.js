import { Route, Navigate, Routes } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

const Authenticate = ({ children }) => {
  const [isAuthorized, setIsAuthorized] = useState(null);
  useEffect(() => {
    axios({ url: "/auth", method: "POST" })
      .then((res) => setIsAuthorized(true))
      .catch((err) => setIsAuthorized(false));
  }, []);

  if (isAuthorized === null) {
    return null;
  }

  return isAuthorized ? children : <Navigate to="/login" replace={true} />;
};

export default Authenticate;
