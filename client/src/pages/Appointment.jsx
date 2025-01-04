import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets_frontend/assets';

const Appointment = () => {
  const { docid } = useParams();
  const { doctors,currencysymbol } = useContext(AppContext);
  const [docinfo, setdocinfo] = useState(null);
  const [docslots,setdocslots] = useState([])
  const [slotindex,setslotindex] = useState(0)
  const [slottime,setslottime] = useState('')

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
  
      let endtime = new Date();
      endtime.setDate(today.getDate() + i);
      endtime.setHours(21, 0, 0, 0);
  
      if (today.getDate() === currdate.getDate()) {
        currdate.setHours(currdate.getHours() > 10 ? currdate.getHours() + 1 : 10);
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
  
      setdocslots((prev) => [...prev, timeslots]);
    }
  };
  


  useEffect(() => {
    fetchdocinfo();
  }, [doctors, docid]);

  useEffect(() => {
    getAvailableSolts()
  },[docinfo])

  useEffect(() => {
    console.log(docslots)
  },[docslots])


  if (!docinfo) {
    // Show a loading state or fallback content until `docinfo` is loaded
    return <div>Loading doctor information...</div>;
  }

  return (
    <div>
      {/* Doctor details */}
      <div className='flex flex-col sm:flex-row gap-4'>
        <div>
          <img className='bg-primary w-full sm:max-w-72 rounded-lg ' src={docinfo.image} alt={docinfo.name} />
        </div>
        <div className=' flex-1 border border-gray-400 rounded-lg p-8 py-7bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0'>
          <p className='flex items-center gap-2 text-2xl font-medium text-gray-900 '>
            {docinfo.name} <img className='w-5' src={assets.verified_icon} alt="" />
            </p>
          <div className='flex items-center gap-2 text-sm mt-1 text-gray-600'>
            <p>{docinfo.degree} - {docinfo.speciality}</p>
            <button className='py-0.5 px-2 text-xs rounded-full'>{docinfo.experience}</button>
          </div>

          {/* doctor about */}
          <div>
            <p className='flex items-center gap-1 text-sm text-gray-900 mt-3'>About <img src={assets.info_icon} alt="" /></p>
            <p className='text-sm text-gray-500 max-w-[700px] mt-1'>{docinfo.about}</p>
          </div>
          <div>
            <p className='text-gray-500 font-medium mt-4'>Appointment fees: <span className='text-gray-600'>{currencysymbol}{docinfo.fees}</span></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appointment;
