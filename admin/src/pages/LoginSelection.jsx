import React from 'react';

function LoginSelection({ onSelect }) {
  return (
    <div className="selection-container">
      <h1>TeliMedicine Appointment Scheduling</h1>
      <p>Login to Access the System</p>
      <div className="selection-options">
        <div className="card" onClick={() => onSelect('admin')}>
          <h3>Admin</h3>
        </div>
        <div className="card" onClick={() => onSelect('doctor')}>
          <h3>Doctor</h3>
        </div>
      </div>
    </div>
  );
}

export default LoginSelection;
