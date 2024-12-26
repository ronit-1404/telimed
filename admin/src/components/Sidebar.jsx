import React, { useContext } from 'react';
import { AdminContext } from '../context/AdminContext';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  const { atoken } = useContext(AdminContext);

  return (
    <div className="h-screen w-64 bg-gray-100 text-black fixed left-0 top-0 flex flex-col z-40">
      {atoken && (
        <ul className="mt-4 text-[#515151] space-y-4">
          <li>
            <NavLink
              to="/admin-dashboard"
              className={({ isActive }) =>
                `flex items-center gap-3 py-3.5 px-3 md:px-6 cursor-pointer ${
                  isActive ? 'bg-[#F2F3FF] border-r-4 border-blue-700' : ''
                }`
              }
            >
              <img
                src="/icons/dashboard.svg"
                alt="Dashboard Icon"
                className="w-6 h-6 mr-3"
              />
              <p>Dashboard</p>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/all-appointments"
              className={({ isActive }) =>
                `flex items-center gap-3 py-3.5 px-3 md:px-6 cursor-pointer ${
                  isActive ? 'bg-[#F2F3FF] border-r-4 border-blue-700' : ''
                }`
              }
            >
              <img
                src="/icons/appointments.svg"
                alt="Appointments Icon"
                className="w-6 h-6 mr-3"
              />
              <p>Appointments</p>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/add-doctor"
              className={({ isActive }) =>
                `flex items-center gap-3 py-3.5 px-3 md:px-6 cursor-pointer ${
                  isActive ? 'bg-[#F2F3FF] border-r-4 border-blue-700' : ''
                }`
              }
            >
              <img
                src="/icons/add-doctors.svg"
                alt="Add Doctors Icon"
                className="w-6 h-6 mr-3"
              />
              <p>Add Doctors</p>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/doctor-list"
              className={({ isActive }) =>
                `flex items-center gap-3 py-3.5 px-3 md:px-6 cursor-pointer ${
                  isActive ? 'bg-[#F2F3FF] border-r-4 border-blue-700' : ''
                }`
              }
            >
              <img
                src="/icons/doctors-list.svg"
                alt="Doctors List Icon"
                className="w-6 h-6 mr-3"
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
