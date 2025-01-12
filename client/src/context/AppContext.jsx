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
      
      const value = {
        doctors,
        currencysymbol,
        token,setToken,
        backendUrl
    }

    useEffect(() => {
        getDoctors();
    }, []);

    return(
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider