import React, { useState } from 'react';
import LoginSelection from './pages/LoginSelection';
import AdminLogin from './pages/AdminLogin';
import DoctorLogin from './pages/DoctorLogin';
import './app.css'
const App = () => {
  const [selectedRole, setSelectedRole] = useState('');

  const handleRoleSelection = (role) => {
    setSelectedRole(role);
  };

  return (
    <div>
      {selectedRole === '' && <LoginSelection onSelect={handleRoleSelection} />}
      {selectedRole === 'admin' && <AdminLogin />}
      {selectedRole === 'doctor' && <DoctorLogin />}
    </div>
  );
};

export default App;
