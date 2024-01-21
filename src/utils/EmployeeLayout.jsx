// Layout.jsx
import React from "react";
import Navbar from "../Pages/Manager/Navbar";
import useToast from "../customHook/useToast";
import isAuth from "./isAuth";
import { useNavigate } from "react-router-dom";
import EmployeeSidebar from "../Pages/Manager/EmployeeSidebar";

const EmployeeLayout = ({ children }) => {
  const { showToast } = useToast();
  const navigate = useNavigate()

//   if(!isAuth() || !isEmployee()){
//     navigate("../auth/login");
//   }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-56 bg-white border-r overflow-y-auto">
        <EmployeeSidebar />
      </div>

      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Navbar */}
        <Navbar />

        {/* Main Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-slate-100 m-auto p-2 h-full w-full ">
          <div className="w-full bg-white h-full rounded-xl">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default EmployeeLayout;
