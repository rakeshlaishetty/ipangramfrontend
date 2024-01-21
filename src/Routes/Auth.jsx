// Auth.jsx
import React, { Suspense, useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import getToken from "../utils/getToken";
import { getUserInfo, isManager, isEmployee } from "../utils/getUserInfo";
import { useNavigate } from "react-router-dom";

import Loading from "../components/Loading";

const Login = React.lazy(() => import("../components/Login"));
const Signup = React.lazy(() => import("../components/Signup"));

const Auth = () => {
  const navigate = useNavigate();

  const token = getToken();
  useEffect(() => {
    if (token && isManager()) {
      navigate("/manager/viewalldepartments");
    }
    if (token && isEmployee()) {
      navigate("/employee/viewprofile");
    }
  }, [token, navigate]);
  
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="*" element={<Navigate to={"/auth/login"} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Suspense>
  );
};

export default Auth;
