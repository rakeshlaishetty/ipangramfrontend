import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { states } from "../../utils/StateList";
import DepartMentApi from "../../axios/Department";
import EmployeeApi from "../../axios/Employee";
import useToast from "../../customHook/useToast";

const AddUserToDepartment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { DepartmentData } = location.state;
  if (!DepartmentData) {
    navigate(-1);
  }
  const [formData, setFormData] = useState({
    Department: DepartmentData.Department || "",
    selectedEmployee: "", // State to store selected employee ID
  });
  const [formErrors, setFormErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(true);
  const [employeesData, setEmployeesData] = useState([]);

  const { showToast } = useToast();

  const locations = states;

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    if (!formData.Department.trim()) {
      errors.firstName = "Department Name is required";
      isValid = false;
    }

    setFormErrors(errors);
    setIsFormValid(isValid);

    return isValid;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      const newdata = { id:formData.selectedEmployee, deptid: DepartmentData._id };
      console.log("Form submitted:", formData);
      try {
        const response = await DepartMentApi.AddDeptUser(newdata);
        if (response.status || response.success) {
          console.log(response.data, "response data");
          showToast("success", "Updated Successfully.");
          navigate("../viewalldepartments");
        } else {
          throw new Error(response.message);
        }
      } catch (error) {
        showToast("error", error.message || "Failed to Update");
      }
    }
  };

  useEffect(() => {
    const getEmployeesData = async () => {
      try {
        const response = await EmployeeApi.getAllEmployees({ islimit: true });
        if (response.status || response.success) {
          console.log(response.data.employees, "response data");
          setEmployeesData(response.data.employees);
        } else {
          throw new Error(response.message);
        }
      } catch (error) {
        showToast("error", error.message || "Failed to Update");
      }
    };

    getEmployeesData();
  }, []);

  return (
    <div className="flex items-center align-middle w-full justify-center">
      <div className="max-w-xs mt-10 w-full m-5">
        <div className="bg-white shadow-xl rounded-lg py-3 w-full flex flex-col justify-center items-center">
          <div className="photo-wrapper p-2">
            <img
              className="w-32  rounded-full mx-auto"
              src="https://w7.pngwing.com/pngs/722/101/png-transparent-computer-icons-user-profile-circle-abstract-miscellaneous-rim-account.png"
              alt="John Doe"
            />
          </div>
          <div className="p-2">
            <h3 className="text-center text-xl text-gray-900 font-medium leading-8">
              Add User To Department
            </h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-4 flex flex-row align-middle items-center ga-4">
                <label
                  htmlFor="Department"
                  className="block text-sm font-medium text-gray-600 m-3"
                >
                  Department
                </label>
                <p>{formData.Department}</p>
              </div>

              <div className="mt-4">
                <label htmlFor="selectedEmployee" className="block text-sm font-medium text-gray-600 m-3">
                  Select Employee
                </label>
                <select
                  id="selectedEmployee"
                  name="selectedEmployee"
                  value={formData.selectedEmployee}
                  onChange={handleInputChange}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                >
                  <option value="" disabled>Select an employee</option>
                  {employeesData.map((employee) => (
                    <option key={employee._id} value={employee._id}>
                      {employee.firstName}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mt-4">
                <button
                  type="submit"
                  className="bg-teal-700 hover:bg-blue-800 hover:text-white text-black font-bold py-2 px-4 rounded-full"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddUserToDepartment;
