import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { states } from "../../utils/StateList";
import DepartmentApi from "../../axios/Department"
import useToast from "../../customHook/useToast";

const EditDepartment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { DepartmentData } = location.state;
  if(!DepartmentData) {
    navigate(-1)
  }
  const [formData, setFormData] = useState({
    Department: DepartmentData.Department || "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(true);

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
        const newdata = {...formData,id:DepartmentData._id}
      console.log("Form submitted:", formData);
      try {
        const response = await DepartmentApi.UpdateDept(newdata);
        if (response.status || response.success) {
          console.log(response.data, "response data");
          showToast("success", "Updated Successfully.");
          navigate("../viewalldepartments")
        } else {
          throw new Error(response.message);
        }
      } catch (error) {
        showToast("error", error.message || "Failed to Update");
      }

   
    }
  };

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
              Edit Department Info
            </h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="Department"
                  className="block text-sm font-medium text-gray-600"
                >
                  Department
                </label>
                <input
                  type="text"
                  id="Department"
                  name="Department"
                  value={formData.Department}
                  onChange={handleInputChange}
                  className={`mt-1 p-2 w-full border ${
                    formErrors.Department ? "border-red-500" : "border-gray-300"
                  } rounded-md`}
                />
                {formErrors.Department && (
                  <p className="text-red-500 text-xs mt-1">
                    {formErrors.Department}
                  </p>
                )}
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

export default EditDepartment;
