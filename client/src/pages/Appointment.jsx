import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets_frontend/assets';

const Appointment = () => {
  const { docid } = useParams();
  const { doctors, currencysymbol } = useContext(AppContext);
  const dayofweek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const [docinfo, setdocinfo] = useState(null);
  const [docslots, setdocslots] = useState([]);
  const [slotindex, setslotindex] = useState(0);

  const fetchdocinfo = async () => {
    const docinfo = doctors.find(doc => doc._id === docid);
    setdocinfo(docinfo);
    console.log(docinfo);
  };

  const getAvailableSolts = async () => {
    setdocslots([]);
    let today = new Date();

    for (let i = 0; i < 7; i++) {
      let currdate = new Date(today);
      currdate.setDate(today.getDate() + i);

      let endtime = new Date(currdate);
      endtime.setHours(21, 0, 0, 0);

      if (i === 0) { // For the current day
        currdate.setHours(Math.max(currdate.getHours() + 1, 10));
        currdate.setMinutes(currdate.getMinutes() > 30 ? 30 : 0);
      } else {
        currdate.setHours(10);
        currdate.setMinutes(0);
      }

      let timeslots = [];

      while (currdate < endtime) {
        let formatedtime = currdate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        timeslots.push({
          datetime: new Date(currdate),
          time: formatedtime,
        });

        currdate.setMinutes(currdate.getMinutes() + 30);
      }

      console.log('Generated slots for', currdate.toDateString(), timeslots);
      setdocslots((prev) => [...prev, timeslots]);
    }
  };

  useEffect(() => {
    fetchdocinfo();
  }, [doctors, docid]);

  useEffect(() => {
    if (docinfo) {
      getAvailableSolts();
    }
  }, [docinfo]);

  useEffect(() => {
    console.log(docslots);
  }, [docslots]);

  if (!docinfo) {
    return <div>Loading doctor information...</div>;
  }

  return (
    <div>
      {/* Doctor details */}
      <div className='flex flex-col sm:flex-row gap-4'>
        <div>
          <img className='bg-primary w-full sm:max-w-72 rounded-lg' src={docinfo.image} alt={docinfo.name} />
        </div>
        <div className='flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0'>
          <p className='flex items-center gap-2 text-2xl font-medium text-gray-900'>
            {docinfo.name} <img className='w-5' src={assets.verified_icon} alt="" />
          </p>
          <div className='flex items-center gap-2 text-sm mt-1 text-gray-600'>
            <p>{docinfo.degree} - {docinfo.speciality}</p>
            <button className='py-0.5 px-2 text-xs rounded-full'>{docinfo.experience}</button>
          </div>

          {/* Doctor about */}
          <div>
            <p className='flex items-center gap-1 text-sm text-gray-900 mt-3'>About <img src={assets.info_icon} alt="" /></p>
            <p className='text-sm text-gray-500 max-w-[700px] mt-1'>{docinfo.about}</p>
          </div>
          <div>
            <p className='text-gray-500 font-medium mt-4'>Appointment fees: <span className='text-gray-600'>{currencysymbol}{docinfo.fees}</span></p>
          </div>
        </div>
      </div>

      {/* Booking */}
      <div className='sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700'>
        <p>Booking slots</p>
        <div className='flex gap-3 items-center w-full overflow-x-scroll mt-4'>
          {docslots.length > 0 ? (
            docslots.map((item, index) => (
              <div
                className={`text-center py-8 min-w-16 rounded-full cursor-pointer ${slotindex === index ? 'bg-primary text-white' : 'border border-gray-200'}`}
                key={index}
                onClick={() => setslotindex(index)}
              >
                <p>{item[0] ? dayofweek[item[0].datetime.getDay()] : 'N/A'}</p>
                <p>{item[0] ? item[0].datetime.getDate() : 'No Slots'}</p>
              </div>
            ))
          ) : (
            <p>No available slots.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Appointment;
