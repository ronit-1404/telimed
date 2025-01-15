import { createContext, useState } from "react";
import { doctors } from "../assets/assets_frontend/assets";
import { useSearchParams } from "react-router-dom";
import {toast} from 'react-toastify'
import { useEffect } from "react";
import axios from 'axios'
export const AppContext = createContext();

const AppContextProvider = (props) => {

    const currencysymbol = '$'
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [doctors,setDoctors] = useState();

    const initialToken = localStorage.getItem('token') || false;
    const [token, setToken] = useState(initialToken);
    const [userData,setUserData] = useState(false)

    const getDoctors = async () => {
        try {
          const { data } = await axios.get(`${backendUrl}/api/doctor/list`);
          if (data.success) {
            setDoctors(data.doctors);
          } else {
            toast.error(data.message);
          }
        } catch (error) {
          console.error("Error fetching doctors:", error);
          toast.error("Failed to load doctors.");
        }
      };
      
      const loadUserProfileData = async () => {
        try {
          const {data} = await axios.get(`${backendUrl}/api/user/get-profile`,{headers:{token}})
          if(data.success){
            setUserData(data.userData)
          }else{
            toast.error(data.message)
          }
        } catch (error) {
          console.error(error);
          toast.error(error.message);
        }
      }

      const value = {
        doctors,
        currencysymbol,
        token,setToken,
        backendUrl,
        userData,setUserData,
        loadUserProfileData
    }

    useEffect(() => {
        getDoctors();
    }, []);

    useEffect(() => {
      if(token){
        loadUserProfileData()
      }else{
        setUserData(false)
      }
    },[token])

    return(
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider