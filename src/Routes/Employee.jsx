// Auth.jsx
import React, { Suspense, useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import getToken from "../utils/getToken";
import PrivateRoute from "../utils/ProtectedRoute";
import { useNavigate } from "react-router-dom";
import EmployeeLayout from '../utils/EmployeeLayout';
import { isEmployee } from "../utils/getUserInfo";
import isAuth from "../utils/isAuth";

import Loading from "../components/Loading";

const Dashboard = React.lazy(() => import("../Pages/Manager/Dashboard"));
const ViewProfile = React.lazy(() => import("../Pages/Employee/ViewProfile"));
const EdiProfileEmployee = React.lazy(() => import("../Pages/Employee/EdiProfileEmployee"));


const Employee = () => {
  const navigate = useNavigate();
  const token = getToken();

  if(!isAuth() || !isEmployee()){
    navigate("../login");
  }

  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="*" element={<Navigate to={"viewprofile"} />} />
        <Route path="/" element={<Navigate to={"viewprofile"} />} />
       
        <Route
          path="/viewprofile"
          element={
            <PrivateRoute allowedRole="employee" children={<EmployeeLayout><ViewProfile /> </EmployeeLayout>} />
          }
        />
        <Route
          path="/editprofile"
          element={
            <PrivateRoute allowedRole="employee" children={<EmployeeLayout><EdiProfileEmployee /> </EmployeeLayout>} />
          }
        />
        
      </Routes>
    </Suspense>
  );
};

export default Employee;
