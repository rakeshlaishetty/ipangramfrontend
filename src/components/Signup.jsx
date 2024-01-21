import React, { useEffect, useState } from "react";
import UserIcon from "../assets/user.png";
import useToast from "../customHook/useToast";
import Register from "../axios/Register";
import Roles from "../axios/roles";
import { states } from "../utils/StateList";
import { useNavigate } from "react-router-dom";

const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const isValidPassword = (password) => {
  return password.length >= 8;
};

const indianStates = states;

export default function Signup() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    role: "",
    location: "Andhra Pradesh",
  });
  const navigate = useNavigate()
  const { showToast } = useToast();
  const [rolesData, setRolesData] = useState([]);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await Roles.fecthroles();
        if (response.success || response.status) {
          setRolesData(response.data);
        } else {
          throw new Error(response.message);
        }
      } catch (error) {
        showToast("error", error.message || "Failed to Login");
      }
    };

    fetchRoles();
  }, []);

  const { email, password, firstName, lastName, role, location } = formData;
  const [isPasswordValid, setIsPasswordValid] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isEmailValid = isValidEmail(email);
    const isPasswordValid = isValidPassword(password);
    let message = "";

    if (!isEmailValid) {
      message = message + "Provide a valid email & ";
    }
    if (!isPasswordValid) {
      message = message + "Provide a valid password";
    }

    if (isEmailValid && isPasswordValid) {
      try {
        const data = {
          email,
          password,
          firstName,
          lastName,
          role,
          location,
        };
        const response = await Register.signup(data);
        if (response.status || response.success) {
          console.log(response.data, "response data");
          showToast("success", "Signup Success. Please login.");
          navigate("/login")
        } else {
          throw new Error(response.message);
        }
      } catch (error) {
        showToast("error", error.message || "Failed to Signup");
      }
    } else {
      showToast("error", message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center  sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 shadow-2xl p-5">
        <div>
          <img className="mx-auto h-12 w-auto" src={UserIcon} alt="Workflow" />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign up for an account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="m-2">
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={handleChange}
                required
                className="appearance-none rounded-none relative block
                  w-full px-3 py-2 border border-gray-300
                  placeholder-gray-500 text-gray-900 rounded-t-md
                  focus:outline-none focus:ring-indigo-500
                  focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div className="m-2">
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={handleChange}
                required
                className={`appearance-none rounded-none relative block
                  w-full px-3 py-2 border border-gray-300
                  placeholder-gray-500 text-gray-900 rounded-b-md
                  focus:outline-none focus:ring-indigo-500
                  focus:border-indigo-500 focus:z-10 sm:text-sm ${
                    !isPasswordValid ? "" : "border-red-500"
                  }`}
                placeholder="Password"
              />
              {isPasswordValid && (
                <p className="text-red-500 text-sm mt-1">
                  Password must be at least 8 characters.
                </p>
              )}
            </div>
          </div>

          <div className="m-2">
            <label htmlFor="firstName" className="sr-only">
              First Name
            </label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              autoComplete="given-name"
              value={firstName}
              onChange={handleChange}
              required
              className="appearance-none rounded-none relative block
                w-full px-3 py-2 border border-gray-300
                placeholder-gray-500 text-gray-900 rounded-b-md
                focus:outline-none focus:ring-indigo-500
                focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="First Name"
            />
          </div>
          <div className="m-2">
            <label htmlFor="lastName" className="sr-only">
              Last Name
            </label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              autoComplete="family-name"
              value={lastName}
              onChange={handleChange}
              required
              className="appearance-none rounded-none relative block
                w-full px-3 py-2 border border-gray-300
                placeholder-gray-500 text-gray-900 rounded-b-md
                focus:outline-none focus:ring-indigo-500
                focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Last Name"
            />
          </div>
          <div className="m-2">
            <label htmlFor="role" className="sr-only">
              Role
            </label>
            <select
              id="role"
              name="role"
              value={role}
              onChange={handleChange}
              required
              className="appearance-none rounded-none relative block
                w-full px-3 py-2 border border-gray-300
                placeholder-gray-500 text-gray-900 rounded-b-md
                focus:outline-none focus:ring-indigo-500
                focus:border-indigo-500 focus:z-10 sm:text-sm"
            >
              <option value="" disabled>
                Select a role
              </option>
              {(rolesData || []).map((role) => {
                return(
                <option key={role._id} value={role._id}>
                  {role.roleName}
                </option>
                )
              }
              )}
            </select>
          </div>
          <div className="m-2">
            <label htmlFor="location" className="sr-only">
              Location
            </label>
            <select
              id="location"
              name="location"
              value={location}
              onChange={handleChange}
              required
              className="appearance-none rounded-none relative block
                w-full px-3 py-2 border border-gray-300
                placeholder-gray-500 text-gray-900 rounded-b-md
                focus:outline-none focus:ring-indigo-500
                focus:border-indigo-500 focus:z-10 sm:text-sm"
            >
              {indianStates.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
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
              Sign up
            </button>
          </div>
          <p>Already Signup ? <span className="border-2 p-1 ml-4 cursor-pointer" onClick={()=>{navigate('/auth/login')}}>Login</span></p>
          
        </form>
      </div>
    </div>
  );
}
