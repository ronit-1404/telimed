import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const [showmenu, setshowmenu] = useState(false);
  const [token, settoken] = useState(true);

  return (
    <div className="flex items-center justify-between text-sm py-4 px-6 mb-5 border-b border-gray-300 bg-white shadow-md">
      {/* Logo */}
      <img src="" alt="Logo" className="h-10 cursor-pointer" onClick={() => navigate('/')} />

      {/* Navigation Links */}
      <ul className="hidden md:flex items-center gap-8 font-medium">
        <NavLink to="/" className={({ isActive }) => isActive ? 'text-primary' : 'text-gray-600 hover:text-primary'}>
          <li className="py-1 transition-all">HOME</li>
        </NavLink>
        <NavLink to="/doctors" className={({ isActive }) => isActive ? 'text-primary' : 'text-gray-600 hover:text-primary'}>
          <li className="py-1 transition-all">DOCTORS</li>
        </NavLink>
        <NavLink to="/buymedicine" className={({ isActive }) => isActive ? 'text-primary' : 'text-gray-600 hover:text-primary'}>
          <li className="py-1 transition-all">BUY MEDICINE</li>
        </NavLink>
      </ul>

      {/* Profile and Auth Buttons */}
      <div className="flex items-center gap-6">
        {token ? (
          <div className="relative group">
            <div className="flex items-center gap-2 cursor-pointer">
              <img className="w-10 h-10 rounded-full border border-gray-300" src="" alt="Profile Pic" />
              <img className="w-3" src="" alt="Dropdown Icon" />
            </div>
            <div className="absolute top-12 right-0 w-48 bg-white shadow-lg rounded-md hidden group-hover:flex flex-col gap-2 py-3 z-20">
              <p
                onClick={() => navigate('my-profile')}
                className="px-4 py-2 text-gray-700 hover:text-primary hover:bg-gray-100 cursor-pointer">
                My Profile
              </p>
              <p
                onClick={() => navigate('my-appointments')}
                className="px-4 py-2 text-gray-700 hover:text-primary hover:bg-gray-100 cursor-pointer">
                My Appointments
              </p>
              <p
                onClick={() => settoken(false)}
                className="px-4 py-2 text-gray-700 hover:text-primary hover:bg-gray-100 cursor-pointer">
                Logout
              </p>
            </div>
          </div>
        ) : (
          <button
            onClick={() => navigate('/login')}
            className="hidden md:block bg-primary text-white px-6 py-2 rounded-full font-medium hover:shadow-lg transition-all">
            Create Account
          </button>
        )}

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden focus:outline-none"
          onClick={() => setshowmenu(!showmenu)}>
          <img src="" alt="Menu Icon" className="w-6" />
        </button>
      </div>

      {/* Mobile Menu */}
      {showmenu && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-md flex flex-col gap-4 py-4 px-6 z-10 md:hidden">
          <NavLink to="/" onClick={() => setshowmenu(false)} className="text-gray-600 hover:text-primary">
            HOME
          </NavLink>
          <NavLink to="/doctors" onClick={() => setshowmenu(false)} className="text-gray-600 hover:text-primary">
            DOCTORS
          </NavLink>
          <NavLink to="/buymedicine" onClick={() => setshowmenu(false)} className="text-gray-600 hover:text-primary">
            BUY MEDICINE
          </NavLink>
          {token ? (
            <>
              <p
                onClick={() => {
                  navigate('my-profile');
                  setshowmenu(false);
                }}
                className="text-gray-600 hover:text-primary cursor-pointer">
                My Profile
              </p>
              <p
                onClick={() => {
                  navigate('my-appointments');
                  setshowmenu(false);
                }}
                className="text-gray-600 hover:text-primary cursor-pointer">
                My Appointments
              </p>
              <p
                onClick={() => {
                  settoken(false);
                  setshowmenu(false);
                }}
                className="text-gray-600 hover:text-primary cursor-pointer">
                Logout
              </p>
            </>
          ) : (
            <button
              onClick={() => {
                navigate('/login');
                setshowmenu(false);
              }}
              className="bg-primary text-white px-6 py-2 rounded-full font-medium hover:shadow-lg transition-all">
              Create Account
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
