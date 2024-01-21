import React, { useState,useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { states } from "../../utils/StateList";
import EmployeesApi from "../../axios/Employee"
import useToast from "../../customHook/useToast";

const EdiProfileEmployee = () => {
  const navigate = useNavigate();


  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    location: "",
    email: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(true);

  const { showToast } = useToast();


  
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await EmployeesApi.GetUserownInfo();
        if (response.success || response.status) {
            setFormData(response.data);
        } else {
          throw new Error(response.message);
        }
      } catch (error) {
        showToast("error", error.message || "Failed to Login");
      }
    };

    fetchRoles();
  }, []);



  const validateForm = () => {
    let errors = {};
    let isValid = true;

    if (!formData.firstName.trim()) {
      errors.firstName = "First name is required";
      isValid = false;
    }

    if (!formData.lastName.trim()) {
      errors.lastName = "Last name is required";
      isValid = false;
    }

    if (!formData.location.trim()) {
      errors.location = "Location is required";
      isValid = false;
    }

    if (!formData.email.trim()) {
      errors.email = "Email is required";
      isValid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      errors.email = "Invalid email format";
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

      try {
        const response = await EmployeesApi.UpdateOwnInfo(formData);
        if (response.status || response.success) {
          console.log(response.data, "response data");
          showToast("success", "Updated Successfully.");
          navigate("../showallemployees")
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
              Edit Employee Info
            </h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-gray-600"
                >
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className={`mt-1 p-2 w-full border ${
                    formErrors.firstName ? "border-red-500" : "border-gray-300"
                  } rounded-md`}
                />
                {formErrors.firstName && (
                  <p className="text-red-500 text-xs mt-1">
                    {formErrors.firstName}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-gray-600"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className={`mt-1 p-2 w-full border ${
                    formErrors.lastName ? "border-red-500" : "border-gray-300"
                  } rounded-md`}
                />
                {formErrors.lastName && (
                  <p className="text-red-500 text-xs mt-1">
                    {formErrors.lastName}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="location"
                  className="block text-sm font-medium text-gray-600"
                >
                  Location
                </label>
                <select
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className={`mt-1 p-2 w-full border ${
                    formErrors.location ? "border-red-500" : "border-gray-300"
                  } rounded-md`}
                >
                  <option value="" disabled>
                    Select a location
                  </option>
                  {states.map((loc) => (
                    <option
                      key={loc}
                      value={loc}
                      selected={loc === formData.location} // Set selected attribute based on the comparison
                    >
                      {loc}
                    </option>
                  ))}
                </select>
                {formErrors.location && (
                  <p className="text-red-500 text-xs mt-1">
                    {formErrors.location}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-600"
                >
                  Email
                </label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`mt-1 p-2 w-full border ${
                    formErrors.email ? "border-red-500" : "border-gray-300"
                  } rounded-md`}
                />
                {formErrors.email && (
                  <p className="text-red-500 text-xs mt-1">
                    {formErrors.email}
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

export default EdiProfileEmployee;
