import React, { useContext, useState } from "react";
import LoginSelection from "./pages/LoginSelection";
import AdminLogin from "./pages/AdminLogin";
import DoctorLogin from "./pages/DoctorLogin";
import "./app.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS
import { AdminContext } from "./context/AdminContext";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { Routes,Route } from "react-router-dom";
import Dashboard from "./pages/Admin/Dashboard";
import AllAppointments from "./pages/Admin/AllAppointments";
import AddDoctor from "./pages/Admin/AddDoctor";
import DoctorsList from "./pages/Admin/DoctorsList";
import MyAppointments from "../../client/src/pages/MyAppointments";
import MyProfile from "../../client/src/pages/MyProfile";

const App = () => {
    const [selectedRole, setSelectedRole] = useState("");

    const handleRoleSelection = (role) => {
        setSelectedRole(role);
    };

    const {atoken} = useContext(AdminContext)
    return atoken ?(
        <div className="bg-[#F8F9FD]">
            <ToastContainer />
            <Navbar />
            <div className="flex items-start">
                <Sidebar />
                <Routes>
                    <Route path='/' element={<></>} />
                    <Route path="/admin-dashboard" element={<Dashboard />} />
                    <Route path="/all-appointments" element={<AllAppointments />} />
                    <Route path="/add-doctor" element={<AddDoctor />} />
                    <Route path="/doctor-list" element={<DoctorsList />} />
                    <Route path="/my-appointments" element={<MyAppointments />} />
                    <Route path="my-profile" element={<MyProfile />} />
                </Routes>
            </div>
        </div>
    ) : (
        <>
            {selectedRole === "" && <LoginSelection onSelect={handleRoleSelection} />}
            {selectedRole === "admin" && <AdminLogin />}
            {selectedRole === "doctor" && <DoctorLogin />}
            
        </>
    )
};

export default App;
