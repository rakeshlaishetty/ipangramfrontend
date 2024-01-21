import React, { useState, useEffect } from "react";
import UserIcon from "../assets/user.png";
import useToast from "../customHook/useToast";
import { useNavigate } from "react-router-dom";
import Authentication from "../axios/Autnetication"

const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const isValidPassword = (password) => {
  return password.length >= 8;
};

export default function Login() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;
  const [isPasswordValid, setIsPasswordValid] = useState(false);

  const { showToast } = useToast();

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
        
        const data = { email, password };
        const response = await Authentication.login(data);
        if(response.status || response.success ) {
          console.log(response.data,'response data')
          showToast("success","Login Success.");
          localStorage.setItem('token',response.data.token)
          localStorage.setItem('user',JSON.stringify(response.data.user))
          setTimeout(()=>{
            if(response.data.user.role.roleName == 'manager') {
              navigate('../manager/')
            } else if(response.data.user.role.roleName == 'employee') {
              navigate('../employee/')
            }else {
              localStorage.clear()
            }
          },2000)
        }else {
          throw new Error(response.message)
        }
      } catch (error) {
        showToast("error", (error.message || "Failed to Login"));
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
            Sign in to your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <input type="hidden" name="remember" defaultValue="true" />
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

          <div>
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
              Sign in
            </button>
          </div>
          <div>
            <button
              type="button"
              onClick={()=>{navigate("/auth/signup")}}
              className="group relative w-full flex justify-center
              py-2 px-4 border border-transparent text-sm font-medium
              rounded-md text-white bg-indigo-600 hover:bg-indigo-700
              focus:outline-none focus:ring-2 focus:ring-offset-2
              focus:ring-indigo-500"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                {/* Add any icon or content for the button */}
              </span>
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
