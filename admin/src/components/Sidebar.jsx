import React, { useContext } from 'react';
import { AdminContext } from '../context/AdminContext';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  const { atoken } = useContext(AdminContext);

  return (
    <div className="h-screen w-64 bg-gray-100 text-black fixed left-0 top-0 flex flex-col z-40 shadow-lg">
      {atoken && (
        <ul className="mt-6 text-[#515151] space-y-6">
          <li>
            <NavLink
              to="/admin-dashboard"
              className={({ isActive }) =>
                `flex items-center gap-3 py-3 px-4 cursor-pointer ${
                  isActive ? 'bg-blue-100 border-r-4 border-blue-700' : ''
                }`
              }
            >
              <img
                src="/icons/dashboard.svg"
                alt="Dashboard Icon"
                className="w-6 h-6"
              />
              <p>Dashboard</p>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/all-appointments"
              className={({ isActive }) =>
                `flex items-center gap-3 py-3 px-4 cursor-pointer ${
                  isActive ? 'bg-blue-100 border-r-4 border-blue-700' : ''
                }`
              }
            >
              <img
                src="/icons/appointments.svg"
                alt="Appointments Icon"
                className="w-6 h-6"
              />
              <p>Appointments</p>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/add-doctor"
              className={({ isActive }) =>
                `flex items-center gap-3 py-3 px-4 cursor-pointer ${
                  isActive ? 'bg-blue-100 border-r-4 border-blue-700' : ''
                }`
              }
            >
              <img
                src="/icons/add-doctors.svg"
                alt="Add Doctors Icon"
                className="w-6 h-6"
              />
              <p>Add Doctors</p>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/doctor-list"
              className={({ isActive }) =>
                `flex items-center gap-3 py-3 px-4 cursor-pointer ${
                  isActive ? 'bg-blue-100 border-r-4 border-blue-700' : ''
                }`
              }
            >
              <img
                src="/icons/doctors-list.svg"
                alt="Doctors List Icon"
                className="w-6 h-6"
              />
              <p>Doctors List</p>
            </NavLink>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Sidebar;
