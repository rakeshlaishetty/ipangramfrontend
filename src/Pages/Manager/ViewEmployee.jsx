import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const ViewEmployee = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { employeeData } = location.state;
  console.log(employeeData, "employeeData");
  if (!employeeData) {
    navigate(-1);
  }

  return (
    <div class="flex items-center align-middle w-full justify-center">
      <div class="max-w-xs mt-24 w-96">
        <div class="bg-white shadow-xl rounded-lg py-3 w-full flex flex-col justify-center items-center">
          <div class="photo-wrapper p-2">
            <img
              class="w-32 h-32 rounded-full mx-auto"
              src="https://w7.pngwing.com/pngs/722/101/png-transparent-computer-icons-user-profile-circle-abstract-miscellaneous-rim-account.png"
              alt="John Doe"
            />
          </div>
          <div class="p-2">
            <h3 class="text-center text-xl text-gray-900 font-medium leading-8">
              Employee Info
            </h3>
            <table class="text-xs my-3">
              <tbody>
                <tr>
                  <td class="px-2 py-2 text-gray-500 font-semibold">Name</td>
                  <td class="px-2 py-2">{`${employeeData.firstName} ${employeeData.lastName}`}</td>
                </tr>
                <tr>
                  <td class="px-2 py-2 text-gray-500 font-semibold">location</td>
                  <td class="px-2 py-2">{employeeData.location}</td>
                </tr>
                <tr>
                  <td class="px-2 py-2 text-gray-500 font-semibold">Email</td>
                  <td class="px-2 py-2">{employeeData.email}</td>
                </tr>
              </tbody>
            </table>

           
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewEmployee;
