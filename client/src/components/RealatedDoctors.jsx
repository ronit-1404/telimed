import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'

const RealatedDoctors = ({speciality,docid}) => {

    const {doctors} = useContext(AppContext)
    const [reldoc,setreldoc] = useState([])

    useEffect(() => {
        if(doctors.length > 0 && speciality){
            const dosstate = doctors.filter((doc) => {doc.speciality === speciality})
        }
    },[doctors,speciality,docid])
  return (
    <div>
      
    </div>
  )
}

export default RealatedDoctors
