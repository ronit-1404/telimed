import axios from "axios";
import { createContext, useState } from "react";
import { toast } from "react-toastify";

export const AdminContext = createContext();

const AdminContextProvider = (props) => {
    const [atoken, setatoken] = useState(localStorage.getItem("aToken") || "");
    const [doctors, setdoctors] = useState([]);
    const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";

    const getAllDoctors = async () => {
        try {
            console.log("Fetching doctors...");
            //the second parameter expalains that no parameter is begin sent in body of post request
            const { data } = await axios.post(
                `${backendUrl}/api/admin/all-doctors`,
                {},
                { headers: { Authorization: `Bearer ${atoken}` } }
            );
            console.log("Response data:", data);
            if (data.success) {
                setdoctors(data.doctors);
                console.log("Doctors list:", data.doctors);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error("Error fetching doctors:", error);
            toast.error(error.message);
        }
    };

    const changeavailability = async (docid) => {
        try {
            const { data } = await axios.post(
                `${backendUrl}/api/admin/change-availability`,
                { docid },
                { headers: { Authorization: `Bearer ${atoken}` } }
            );

            if (data.success) {
                toast.success(data.message);
                getAllDoctors();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error("Error changing availability:", error);
            toast.error(error.message);
        }
    };

    const value = {
        atoken,
        setatoken,
        backendUrl,
        doctors,
        getAllDoctors,
        changeavailability
    };

    return <AdminContext.Provider value={value}>{props.children}</AdminContext.Provider>;
};

export default AdminContextProvider;
