import { createContext, useState } from "react";

export const AdminContext = createContext();

const AdminContextProvider = (props) => {
    const [atoken, setatoken] = useState(localStorage.getItem('aToken')?localStorage.getItem('aToken'):'');

    // Load backend URL from environment variable with a fallback
    const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";

    console.log("Backend URL:", backendUrl);

    const value = {
        atoken,
        setatoken,
        backendUrl,
    };

    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    );
};

export default AdminContextProvider;
