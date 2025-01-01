import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { doctors } from '../assets/assets_frontend/assets'
const Doctors = () => {

  const { speciality } = useParams()
  console.log(speciality)

  const {Doctors} = useContext(AppContext)
  const [filterdoc,setfilterdoc] = useState([])
  const navigate = useNavigate()

  const applyfilter = () => {
    if(speciality){
      setfilterdoc(doctors.filter(doc => doc.speciality === speciality))
    }else{
      setfilterdoc(doctors)
    }
  }
// we use useeffect hook (when ever speciality of doctor gets changed)
  useEffect(()=>{
    applyfilter()
  },[doctors,speciality])

  return (
    <div>
      <p className='text-gray-600'>Brows throgh the doctors speciality.</p>
      <div className='flex flex-col sm:flex-row items-start gap-5 mt-5'>
        <div className='flex flex-col gap-4 text-sm text-gray-600'>
          <p onClick={()=> speciality === 'General Physician' ? navigate('/all-doctors') : navigate('/all-doctors/General physician')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "General physician" ? "bg-indigo-100 text-black" : ""}`}>General Physician</p>
          <p onClick={()=> speciality === 'Gynecologist' ? navigate('/all-doctors') : navigate('/all-doctors/Gynecologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor- ${speciality === "Gynecologist" ? "bg-indigo-100 text-black" : ""}`}>Gynecologist</p>
          <p onClick={()=> speciality === 'Dermatologist' ? navigate('/all-doctors') : navigate('/all-doctors/Dermatologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Dermatologist" ? "bg-indigo-100 text-black" : ""}`}>Dermatologist</p>
          <p onClick={()=> speciality === 'Pediatricians' ? navigate('/all-doctors') : navigate('/all-doctors/Pediatricians')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Pediatricians" ? "bg-indigo-100 text-black" : ""}`}>Pediatricians</p>
          <p onClick={()=> speciality === 'Neurologist' ? navigate('/all-doctors') : navigate('/all-doctors/Neurologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Neurologist" ? "bg-indigo-100 text-black" : ""}`}>Neurologist</p>
          <p onClick={()=> speciality === 'Gastroenterologist' ? navigate('/all-doctors') : navigate('/all-doctors/Gastroenterologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Gastroenterologist" ? "bg-indigo-100 text-black" : ""}`}>Gastroenterologist</p>
        </div>
        <div className='w-full grid grid-cols-auto gap-4 gap-y-6'>
          {
            filterdoc.map((item,index) => {
              return(
                <div onClick={() => {
                  if (item._id) {
                    navigate(`/appointment/${item._id}`);
                  } else {
                    console.error('Doctor ID is missing', item);
                  }
                }} className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500 ' key={index}>
                  <img className='bg-blue-50' src={item.image} alt="" />
                  <div className='p-4'>
                    <div className='flex items-center gap-2 text-sm text-center text-green-500'>
                      <p className='w-2 h-2 bg-green-500 rounded-full'></p><p>Available</p>
                    </div>
                    <p className='text-gray-900 text-lg font-medium'>{item.name}</p>
                    <p className='text-gray-600 text-sm'>{item.speciality}</p>
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

export default Doctors
