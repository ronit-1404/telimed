import React, { useContext } from 'react';
import { AdminContext } from '../context/AdminContext';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  const { atoken } = useContext(AdminContext);

  return (
    <div className="h-screen w-64 bg-gray-100 text-black fixed left-0 top-0 flex flex-col z-40">
      {atoken && (
        <ul className="mt-4 space-y-4">
          <li>
            <NavLink
              to="/admin-dashboard"
              className="flex items-center px-4 py-2 hover:bg-gray-200 rounded"
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
              className="flex items-center px-4 py-2 hover:bg-gray-200 rounded"
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
              className="flex items-center px-4 py-2 hover:bg-gray-200 rounded"
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
              className="flex items-center px-4 py-2 hover:bg-gray-200 rounded"
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
