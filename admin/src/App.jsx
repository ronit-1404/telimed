import React, { useState } from "react";
import LoginSelection from "./pages/LoginSelection";
import AdminLogin from "./pages/AdminLogin";
import DoctorLogin from "./pages/DoctorLogin";
import "./app.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS

const App = () => {
    const [selectedRole, setSelectedRole] = useState("");

    const handleRoleSelection = (role) => {
        setSelectedRole(role);
    };

    return (
        <div>
            {selectedRole === "" && <LoginSelection onSelect={handleRoleSelection} />}
            {selectedRole === "admin" && <AdminLogin />}
            {selectedRole === "doctor" && <DoctorLogin />}
            <ToastContainer /> {/* Include ToastContainer for displaying notifications */}
        </div>
    );
};

export default App;
