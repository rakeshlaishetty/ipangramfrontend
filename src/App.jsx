import React, { Suspense,useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Loading from "./components/Loading";
import isAuth from "../src/utils/isAuth";
import { isManager, isEmployee } from "../src/utils/getUserInfo";
import { useNavigate } from "react-router-dom";
import getToken from "../src//utils/getToken";

const Auth = React.lazy(() => import("./Routes/Auth"));
const Manager = React.lazy(() => import("./Routes/Manager"));
const Employee = React.lazy(() => import("./Routes/Employee"));

const App = () => {

  const isAuthenticated = isAuth();

  const navigate = useNavigate();
  const token = getToken();
 
  
  return (
    <div>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="*" element={<Navigate to={"/auth"} />} />
          <Route path="/auth/*" element={<Auth />} />
          <Route path="/manager/*" element={<Manager />} />
          <Route path="/employee/*" element={<Employee />} />
        </Routes>
      </Suspense>
    </div>
  );
};

export default App;


