import React, { useContext } from 'react';
import { AdminContext } from '../context/AdminContext';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { atoken, setatoken } = useContext(AdminContext);
  const navigate = useNavigate();

  const Logout = () => {
    navigate('/');
    atoken && setatoken('');
    atoken && localStorage.removeItem('atoken');
  };

  return (
    <div className="relative">
      {/* Hover Area */}
      <div className="absolute top-0 left-0 w-full h-4 bg-transparent z-50 hover:h-16 transition-all duration-300">
        <nav className="bg-gray-100 text-black fixed top-0 left-64 w-[calc(100%-16rem)] shadow-md z-40 opacity-0 hover:opacity-100 transition-opacity duration-300">
          <div className="container mx-auto px-4 py-3 flex justify-between items-center">
            {/* Logo Section */}
            <div className="flex items-center space-x-4">
              <img className="w-36 cursor-pointer" src="" alt="Logo" />
              <p className="border px-2.5 py-0.5 rounded-full border-gray-500 text-black">
                {atoken ? 'Admin' : 'Doctor'}
              </p>
            </div>

            {/* Logout Button */}
            <button
              onClick={Logout}
              className="bg-blue-600 text-white hover:bg-blue-500 text-sm px-5 py-2 rounded-full"
            >
              Logout
            </button>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
