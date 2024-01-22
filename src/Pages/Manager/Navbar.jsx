import { useState } from "react";
import { Link } from "react-router-dom";

function DropdownItem({ to, children }) {
  return (
    <Link
      to={to}
      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
    >
      {children}
    </Link>
  );
}

function DropdownItemButton({ to, children }) {
  const handleLogout = () => {
    localStorage.clear();
    window.location.reload()
  };
  return (
    <p
      onClick={handleLogout}
      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
    >
      {children}
    </p>
  );
}

function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  return (
    <div>
      <div className="pt-0 pr-0 pb-0 pl-0 mt-0 mr-0 mb-0 ml-0"></div>
      <div className="bg-white">
        <div className="flex-col flex">
          <div className="w-full border-b-2 border-gray-200">
            <div className="bg-white h-16 justify-between items-center mx-auto px-4 flex">
              <div className="md:space-x-6 justify-end items-center ml-auto flex space-x-3">
                <div className="relative">
                  <button
                    onClick={toggleDropdown}
                    className="flex items-center space-x-2"
                  >
                    <img
                      src="https://static01.nyt.com/images/2019/11/08/world/08quebec/08quebec-superJumbo.jpg"
                      className="object-cover btn- h-9 w-9 rounded-full mr-2 bg-gray-300"
                      alt=""
                    />
                    <p className="font-semibold text-sm">user</p>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 ml-2 text-gray-600"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>

                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg">
                      <DropdownItemButton to="/logout">Logout</DropdownItemButton>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
