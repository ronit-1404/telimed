import React, { useContext, useEffect } from 'react';
import { AdminContext } from '../../context/AdminContext';

const DoctorsList = () => {
  const { doctors, atoken, getAllDoctors, changeavailability } = useContext(AdminContext);

  // Fetch doctors when the token is available
  useEffect(() => {
    if (atoken) {
      getAllDoctors();
    }
  }, [atoken, getAllDoctors]);

  return (
    <div className="m-5 p-5 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-semibold text-gray-800 mb-5">All Doctors</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {doctors.length > 0 ? (
          doctors.map((item, index) => (
            <div
              className="border border-gray-300 rounded-lg shadow-md overflow-hidden group hover:shadow-lg transition-shadow duration-200"
              key={index}
            >
              <img
                src={item.img}
                alt={item.name}
                className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-200"
              />
              <div className="p-4">
                <p className="text-lg font-bold text-gray-800">{item.name}</p>
                <p className="text-sm text-gray-600">{item.speciality}</p>
                <div className="flex items-center mt-3">
                  <input
                    onChange={() => changeavailability(item._id)}
                    type="checkbox"
                    checked={item.available}
                    readOnly
                    className="mr-2 cursor-pointer"
                  />
                  <p className={`text-sm ${item.available ? 'text-green-600' : 'text-red-600'}`}>
                    {item.available ? 'Available' : 'Not Available'}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No doctors found.</p>
        )}
      </div>
    </div>
  );
};

export default DoctorsList;
