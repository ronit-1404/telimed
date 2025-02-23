import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";
import { assets } from "../../assets/assets_admin/assets";

const Dashboard = () => {
  const { atoken, dashdata, getDashData, cancelAppointment } =
    useContext(AdminContext);

  useEffect(() => {
    if (atoken) {
      getDashData();
    }
  }, [atoken]);
  return (
    dashdata && (
      <div className="m-5">
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-2 bg-white p-4 min-2-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
            <img className="w-14" src={assets.doctor_icon} />
            <div>
              <p>{dashdata.doctors}</p>
              <p>Doctors</p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-white p-4 min-2-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
            <img className="w-14" src={assets.appointment_icon} />
            <div>
              <p>{dashdata.appointments}</p>
              <p>Appointments</p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-white p-4 min-2-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
            <img className="w-14" src={assets.patients_icon} />
            <div>
              <p>{dashdata.doctors}</p>
              <p>Patients</p>
            </div>
          </div>
        </div>

        <div className="bg-white">
          <div className="flex items-center gap-2.5 px-4 mt-10 rounded-t border">
            <img src={assets.list_icon} alt="" />
            <p>Latest Bookings</p>
          </div>
          <div className="pt-4 border border-t-0">
            {dashdata.latestAppointments.map((item, index) => {
              <div key={index}>
                <img src={item.docData.image} alt="" />
                <div>
                  <p>{item.docData.name}</p>
                  <p>{item.slotData}</p>
                </div>
                {item.cancelled ? (
                  <p className="text-red-400 text-xs font-medium">Cancelled</p>
                ) : (
                  <img
                    onClick={() => cancelAppointment(item._id)}
                    className="w-10 cursor-pointer"
                    src={assets.cancel_icon}
                    alt=""
                  />
                )}
              </div>;
            })}
          </div>
        </div>
      </div>
    )
  );
};

export default Dashboard;
