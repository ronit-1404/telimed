import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  const {token,setToken} = useContext(AppContext)
  const logout = () => {
    setToken(false)
    localStorage.removeItem('token')
  }
  return (
    <div className="flex items-center justify-between text-sm py-4 px-6 mb-5 border-b border-gray-300 bg-white shadow-md">
      <img
        src="logo-placeholder.jpg" // Add a valid logo source here
        alt="Logo"
        className="h-10 cursor-pointer"
        onClick={() => navigate("/")}
      />

      <ul className="hidden md:flex items-center gap-8 font-medium">
        <NavLink to="/" className={({ isActive }) => (isActive ? "text-primary" : "text-gray-600 hover:text-primary")}>
          <li className="py-1 transition-all">HOME</li>
        </NavLink>
        <NavLink to="/doctors" className={({ isActive }) => (isActive ? "text-primary" : "text-gray-600 hover:text-primary")}>
          <li className="py-1 transition-all">DOCTORS</li>
        </NavLink>
        <NavLink to="/buymedicine" className={({ isActive }) => (isActive ? "text-primary" : "text-gray-600 hover:text-primary")}>
          <li className="py-1 transition-all">BUY MEDICINE</li>
        </NavLink>
      </ul>

      <div className="flex items-center gap-6">
        {token ? (
          <div className="relative group">
            <div className="flex items-center gap-2 cursor-pointer">
              <img className="w-10 h-10 rounded-full border border-gray-300" src="profile-pic-placeholder.jpg" alt="Profile Pic" />
              <img className="w-3" src="dropdown-icon.jpg" alt="Dropdown Icon" />
            </div>
            <div className="absolute top-12 right-0 w-48 bg-white shadow-lg rounded-md hidden group-hover:flex flex-col gap-2 py-3 z-20">
              <p
                onClick={() => navigate("my-profile")}
                className="px-4 py-2 text-gray-700 hover:text-primary hover:bg-gray-100 cursor-pointer"
              >
                My Profile
              </p>
              <p
                onClick={() => navigate("my-appointments")}
                className="px-4 py-2 text-gray-700 hover:text-primary hover:bg-gray-100 cursor-pointer"
              >
                My Appointments
              </p>
              <p
                onClick={logout}
                className="px-4 py-2 text-gray-700 hover:text-primary hover:bg-gray-100 cursor-pointer"
              >
                Logout
              </p>
            </div>
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="hidden md:block bg-primary text-white px-6 py-2 rounded-full font-medium hover:shadow-lg transition-all"
          >
            Create Account
          </button>
        )}
      </div>

      {showMenu && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-md flex flex-col gap-4 py-4 px-6 z-10 md:hidden">
          <NavLink to="/" onClick={() => setShowMenu(false)} className="text-gray-600 hover:text-primary">
            HOME
          </NavLink>
          <NavLink to="/doctors" onClick={() => setShowMenu(false)} className="text-gray-600 hover:text-primary">
            DOCTORS
          </NavLink>
          <NavLink to="/buymedicine" onClick={() => setShowMenu(false)} className="text-gray-600 hover:text-primary">
            BUY MEDICINE
          </NavLink>
          {token ? (
            <>
              <p
                onClick={() => {
                  navigate("my-profile");
                  setShowMenu(false);
                }}
                className="text-gray-600 hover:text-primary cursor-pointer"
              >
                My Profile
              </p>
              <p
                onClick={() => {
                  navigate("my-appointments");
                  setShowMenu(false);
                }}
                className="text-gray-600 hover:text-primary cursor-pointer"
              >
                My Appointments
              </p>
              <p
                onClick={() => {
                  setToken(false);
                  setShowMenu(false);
                }}
                className="text-gray-600 hover:text-primary cursor-pointer"
              >
                Logout
              </p>
            </>
          ) : (
            <button
              onClick={() => {
                navigate("/login");
                setShowMenu(false);
              }}
              className="bg-primary text-white px-6 py-2 rounded-full font-medium hover:shadow-lg transition-all"
            >
              Create Account
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
