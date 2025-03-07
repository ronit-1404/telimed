import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const TopDoctors = () => {
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);
  console.log(doctors)
  const handleCardClick = (id) => {
    if (id) {
      navigate(`/appointment/${id}`);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      console.error('Doctor ID is missing');
    }
  };

  if (!doctors || doctors.length === 0) {
    // Show a loading or placeholder state until the data is available
    return <p>Loading doctors...</p>;
  }

  return (
    <div className="flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10">
      <h1 className="text-3xl font-medium">Top Doctors</h1>
      <p className="sm:w-1/3 text-center text-sm">Book Appointments for Expert And Trusted Doctors</p>
      <div className="w-full grid grid-cols-auto gap-4 pt-5 gap-y-6 px-3 sm:px-0">
        {doctors.slice(0, 10).map((item, index) => (
          <div
            onClick={() => handleCardClick(item._id)}
            className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500"
            key={index}
          >
            <img className="bg-blue-50" src={item.image} alt="" />
            <div className="p-4">
              <div className="flex items-center gap-2 text-sm text-center text-green-500">
                <p className="w-2 h-2 bg-green-500 rounded-full"></p>
                <p>Available</p>
              </div>
              <p className="text-gray-900 text-lg font-medium">{item.name}</p>
              <p className="text-gray-600 text-sm">{item.speciality}</p>
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={() => {
          navigate('/doctors');
          scrollTo(0, 0);
        }}
        className="bg-blue-200 font-medium text-gray-900 px-12 py-3 rounded-full mt-10 hover:scale-105 duration-300"
      >
        More
      </button>
    </div>
  );
};

export default TopDoctors;
