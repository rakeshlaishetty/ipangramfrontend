import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import DepartmentApi from "../../axios/Department"
import useToast from "../../customHook/useToast";


export default function CreateDepartment() {
    const [formData, setFormData] = useState({
      Department: "",
    });
  
    const navigate = useNavigate();
    const { showToast } = useToast();
  
    const handleChange = (e) => {
      setFormData((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      }));
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      const { Department } = formData;
  
      if (Department.trim() === "") {
        showToast("error", "Department name is required.");
        return;
      }
  
      try {
        const data = {
          Department,
        };

        const response = await DepartmentApi.CreateDept(data);
  
        if (response.status || response.success) {
          showToast("success", "Department added successfully.");
          navigate("../viewalldepartments");
        } else {
          throw new Error(response.message);
        }
      } catch (error) {
        showToast("error", error.message || "Failed to add department.");
      }
    };
  
    return (
      <div className="h-full flex items-center justify-center sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 shadow-2xl p-5">
          <div>
            <h2 className="text-center text-3xl font-extrabold text-gray-900">
              Add Department
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="m-2">
              <label htmlFor="Department" className="sr-only">
                Department Name
              </label>
              <input
                id="Department"
                name="Department"
                type="text"
                autoComplete="Department"
                value={formData.Department}
                onChange={handleChange}
                required
                className="appearance-none rounded-none relative block
                  w-full px-3 py-2 border border-gray-300
                  placeholder-gray-500 text-gray-900 rounded-b-md
                  focus:outline-none focus:ring-indigo-500
                  focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Department Name"
              />
            </div>
  
            <div className="m-2">
              <button
                type="submit"
                className="group relative w-full flex justify-center
                py-2 px-4 border border-transparent text-sm font-medium
                rounded-md text-white bg-indigo-600 hover:bg-indigo-700
                focus:outline-none focus:ring-2 focus:ring-offset-2
                focus:ring-indigo-500"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  {/* Add any icon or content for the button */}
                </span>
                Add Department
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
  