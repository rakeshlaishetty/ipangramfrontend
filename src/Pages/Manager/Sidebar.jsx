// Sidebar.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const links = [
  { to: '/manager/dashboard', label: 'Dashboard' },
  { to: '/manager/viewalldepartments', label: 'View All Departments' },
  { to: '/manager/createdepartment', label: 'Create Department' },
  { to: '/manager/showallemployees', label: 'Show All Employees' },
  { to: '/manager/createemployees', label: 'Create Employees' },
];

const Sidebar = () => {
  const location = useLocation();

  const isActiveLink = (pathname) => {
    return location.pathname.includes(pathname);
  };

  return (
    <div className="flex flex-col h-full bg-white text-black">
      {/* Image */}
      <div className="flex items-center justify-center py-4">
        <img
          className="w-16 h-16 rounded-full"
          src="https://i.pinimg.com/originals/3a/36/20/3a36206f35352b4230d5fc9f17fcea92.png"
          alt="User Avatar"
        />
      </div>

      {/* Sidebar Content */}
      <div className="flex-1 overflow-y-auto">

        <div className="mt-auto p-4">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`block px-4 py-2 rounded-md hover:bg-indigo-600 ${
                isActiveLink(link.to) ? 'bg-indigo-500 text-white' : ''
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
