import React, { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { useNavigate } from 'react-router-dom'
const Navbar = () => {

    const {atoken,setatoken} = useContext(AdminContext)
    
    const navigate = useNavigate()

    const Logout = () => {
        navigate('/')
        atoken && setatoken('')
        atoken && localStorage.removeItem('atoken')
    }


  return (
    <div className='flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-white '>
      <div>
        {/* logo */}
        <img className='w-36 cursor-pointer' src='' alt='' />
        <p className='border px-2.5 py-0.5 rounded-full border-grey-500 text-gray-600'>{atoken ? 'Admin' : 'Doctor'}</p> 
      </div>
      <button onClick={Logout} className='bg-blue-600 text-white text-sm px-10 py-2 rounded-full'>Logout</button>
    </div>
  )
}

export default Navbar
