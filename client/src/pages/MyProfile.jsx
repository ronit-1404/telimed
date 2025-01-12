import React, { useState } from "react";

const MyProfile = () => {
  const [userData, setUserData] = useState({
    name: "Ronit Dhase",
    image: "",
    email: "ronit@gmail.com",
    phone: "+91 9373669434",
    address: {
      line1: "Delhi",
      line2: "India",
    },
    gender: "Male",
    dob: "2004-01-10",
  });

  const [isEdit, setIsEdit] = useState(true);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      {/* Profile Header */}
      <div className="flex items-center space-x-4 mb-6">
        <img
          src={userData.image || "https://via.placeholder.com/150"}
          alt="Profile"
          className="w-24 h-24 rounded-full border-2 border-gray-300"
        />
        {isEdit ? (
          <input
            value={userData.name}
            type="text"
            className="text-2xl font-semibold border-b-2 border-gray-300 focus:outline-none"
            onChange={(e) =>
              setUserData((prev) => ({ ...prev, name: e.target.value }))
            }
          />
        ) : (
          <p className="text-2xl font-semibold">{userData.name}</p>
        )}
      </div>

      <hr className="my-4" />

      {/* Contact Info */}
      <div className="mb-6">
        <h2 className="text-lg font-bold text-gray-700 mb-4">Contact Info</h2>
        <div className="space-y-2">
          <div>
            <p className="font-medium text-gray-600">Email:</p>
            <p className="text-gray-800">{userData.email}</p>
          </div>
          <div>
            <p className="font-medium text-gray-600">Phone:</p>
            {isEdit ? (
              <input
                type="text"
                value={userData.phone}
                className="w-full border-b-2 border-gray-300 focus:outline-none"
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, phone: e.target.value }))
                }
              />
            ) : (
              <p className="text-gray-800">{userData.phone}</p>
            )}
          </div>
          <div>
            <p className="font-medium text-gray-600">Address:</p>
            {isEdit ? (
              <div className="space-y-2">
                <input
                  type="text"
                  value={userData.address.line1}
                  className="w-full border-b-2 border-gray-300 focus:outline-none"
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      address: { ...prev.address, line1: e.target.value },
                    }))
                  }
                />
                <input
                  type="text"
                  value={userData.address.line2}
                  className="w-full border-b-2 border-gray-300 focus:outline-none"
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      address: { ...prev.address, line2: e.target.value },
                    }))
                  }
                />
              </div>
            ) : (
              <p className="text-gray-800">
                {userData.address.line1}
                <br />
                {userData.address.line2}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Basic Information */}
      <div className="mb-6">
        <h2 className="text-lg font-bold text-gray-700 mb-4">Basic Information</h2>
        <div className="space-y-2">
          <div>
            <p className="font-medium text-gray-600">Gender:</p>
            {isEdit ? (
              <select
                value={userData.gender}
                className="w-full border-b-2 border-gray-300 focus:outline-none"
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, gender: e.target.value }))
                }
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            ) : (
              <p className="text-gray-800">{userData.gender}</p>
            )}
          </div>
          <div>
            <p className="font-medium text-gray-600">Birthdate:</p>
            {isEdit ? (
              <input
                type="date"
                value={userData.dob}
                className="w-full border-b-2 border-gray-300 focus:outline-none"
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, dob: e.target.value }))
                }
              />
            ) : (
              <p className="text-gray-800">{userData.dob}</p>
            )}
          </div>
        </div>
      </div>

      {/* Edit/View Toggle */}
      <div className="text-right">
        {isEdit ? (
          <button
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
            onClick={() => setIsEdit(false)}
          >
            Save Information
          </button>
        ) : (
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            onClick={() => setIsEdit(true)}
          >
            Edit
          </button>
        )}
      </div>
    </div>
  );
};

export default MyProfile;
