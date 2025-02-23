import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets_admin/assets";

const AllAppointments = () => {
  const { aToken, appointments, getAllAppointments,cancelAppointment } = useContext(AdminContext);
  const { calculateage,currency } = useContext(AppContext);

  useEffect(() => {
    if (aToken) {
      getAllAppointments();
    }
  }, [aToken, getAllAppointments]);

  return (
    <div className="w-full max-w-6xl mx-auto p-5">
      <p className="mb-4 text-xl font-semibold">All Appointments</p>
      <div className="bg-white rounded-lg shadow overflow-y-auto max-h-[80vh] min-h-[60vh]">
        {/* Header Row */}
        <div className="hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] py-3 px-6 border-b text-gray-600 text-sm font-medium">
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doctor</p>
          <p>Fees</p>
          <p>Actions</p>
        </div>

        {/* Appointment Rows */}
        {appointments.map((item, index) => (
          <div
            key={index}
            className="flex flex-wrap sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_1fr_3fr_1fr] items-center text-gray-700 py-4 px-6 border-b hover:bg-gray-50"
          >
            <p className="hidden sm:block">{index + 1}</p>
            <div className="flex items-center gap-3">
              <img
                className="w-10 h-10 rounded-full object-cover"
                src={item.userData.image}
                alt="Patient"
              />
              <p>{item.userData.name}</p>
            </div>
            <p className="hidden sm:block">{calculateage(item.userData.dob)}</p>
            <p>
              {item.slotDate}, {item.slotTime}
            </p>
            <div className="flex items-center gap-3">
              <img
                className="w-10 h-10 rounded-full object-cover"
                src={item.docData.image}
                alt="Doctor"
              />
              <p>{item.docData.name}</p>
            </div>
            <p className="text-center">{item.fees || "-"}</p>
            <button className="text-blue-500 hover:underline">View</button>
            <p>{currency} {item.amount}</p>
            {item.cancelled
            ? <p className="text-red-400 text-xs font-medium">Cancelled</p>
            : <img onClick={() => cancelAppointment(item._id)} className="w-10 cursor-pointer" src={assets.cancel_icon} alt="" />
            }
            
          </div>
        ))}
      </div>
      
    </div>
  );
};

export default AllAppointments;
