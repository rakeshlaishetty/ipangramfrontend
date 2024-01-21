// Auth.jsx
import React, { Suspense, useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import getToken from "../utils/getToken";
import PrivateRoute from "../utils/ProtectedRoute";
import { useNavigate } from "react-router-dom";
import Layout from '../utils/Layout';

import Loading from "../components/Loading";
import { isManager } from "../utils/getUserInfo";
import isAuth from "../utils/isAuth";

const EditDepartment = React.lazy(() =>
  import("../Pages/Manager/EditDepartment")
);

const AddUserToDepartment = React.lazy(() =>
  import("../Pages/Manager/AddUserToDepartment")
);

const CreateDepartment = React.lazy(() =>
  import("../Pages/Manager/CreateDepartment")
);
const ShowAllEmployees = React.lazy(() =>
  import("../Pages/Manager/ShowAllEmployees")
);
const ShowAllDeptUsers = React.lazy(() =>
  import("../Pages/Manager/ShowAllDeptUsers")
);

const ViewEmployee = React.lazy(() =>
  import("../Pages/Manager/ViewEmployee")
);

const EditEmployee = React.lazy(() =>
  import("../Pages/Manager/EditEmployee")
);

const Createemployees = React.lazy(() =>
  import("../Pages/Manager/Createemployees")
);
const Dashboard = React.lazy(() => import("../Pages/Manager/Dashboard"));

const ViewDepartments = React.lazy(() =>
  import("../Pages/Manager/ViewDepartments")
);

const Manager = () => {
  const navigate = useNavigate();
  const token = getToken();

  if(!isAuth() || !isManager()){
    navigate("../login");
  }

  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="*" element={<Navigate to={"/viewalldepartments"} />} />
        
        <Route
          path="/viewalldepartments"
          element={
            <PrivateRoute allowedRole="manager" children={<Layout><ViewDepartments /> </Layout>} />
          }
        />
        <Route
          path="/viewalldepartments/editdept"
          element={
            <PrivateRoute allowedRole="manager" children={<Layout><EditDepartment /> </Layout>} />
          }
        />
        <Route
          path="/viewalldepartments/viewdeptusers"
          element={
            <PrivateRoute allowedRole="manager" children={<Layout><ShowAllDeptUsers /> </Layout>} />
          }
        />
        <Route
          path="/viewalldepartments/addusertogepartment"
          element={
            <PrivateRoute allowedRole="manager" children={<Layout><AddUserToDepartment /> </Layout>} />
          }
        />
        <Route
          path="/createdepartment"
          element={
            <PrivateRoute
              allowedRole="manager"
              children={<Layout><CreateDepartment /></Layout>}
            />
          }
        />
        <Route
          path="/showallemployees"
          element={
            <PrivateRoute
              allowedRole="manager"
              children={<Layout><ShowAllEmployees /></Layout>}
            />
          }
        />
        <Route
          path="/showallemployees/viewemployee"
          element={
            <PrivateRoute
              allowedRole="manager"
              children={<Layout><ViewEmployee /></Layout>}
            />
          }
        />

        <Route
          path="/showallemployees/editemployee"
          element={
            <PrivateRoute
              allowedRole="manager"
              children={<Layout><EditEmployee /></Layout>}
            />
          }
        />
        <Route
          path="/createemployees"
          element={
            <PrivateRoute
              allowedRole="manager"
              children={<Layout><Createemployees /></Layout>}
            />
          }
        />
      </Routes>
    </Suspense>
  );
};

export default Manager;
