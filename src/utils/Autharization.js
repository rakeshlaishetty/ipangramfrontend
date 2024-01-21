import React from "react";
import { Navigate } from "react-router-dom";

const Authorization = ({ role, allowedRoles, fallbackPath }) => {
  console.log('reached');
  if (!allowedRoles.includes(role)) {
    return <Navigate to={fallbackPath} />;
  } else {
    return null;
  }
};


export default Authorization;
