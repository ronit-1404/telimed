import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets_frontend/assets';

const Appointment = () => {
  const { docid } = useParams();
  const { doctors,currencysymbol } = useContext(AppContext);
  const [docinfo, setdocinfo] = useState(null);

  const fetchdocinfo = async () => {
    const docinfo = doctors.find(doc => doc._id === docid);
    setdocinfo(docinfo);
    console.log(docinfo);
  };

  useEffect(() => {
    fetchdocinfo();
  }, [doctors, docid]);

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
            <p>Appointment fees: <span>{currencysymbol}{docinfo.fees}</span></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appointment;
