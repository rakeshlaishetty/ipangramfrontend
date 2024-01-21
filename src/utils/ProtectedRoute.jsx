import React, { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import isAuth from "./isAuth";

const isAllowed = (userRoles, allowedRole) => {
  return userRoles.includes(allowedRole);
};

export function PrivateRoute({ allowedRole, children }) {
  const navigate = useNavigate();

  useEffect(() => {
    const userRoles = ['manager', 'employee'];

    if(!isAuth()){
      navigate("../../auth/login");
    }
    console.log(isAuth(),'isAuth()')

    if (!isAllowed(userRoles, allowedRole)) {
      // Use absolute path instead of relative path
      navigate("../../auth/login");
    }
  }, [allowedRole, navigate]);

  return children ? children : <Outlet />;
}

export default PrivateRoute;
