import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets_frontend/assets";
import { Form } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
const MyProfile = () => {
  const { userData, setUserData, token,backendUrl,loadUserProfileData } = useContext(AppContext);

  const [isEdit, setIsEdit] = useState(true);
  const [image,setImage] = useState(false);
  
  //update profile and save changes in database
  const updateuserprofiledata = async () => {
    try {
      const formdata = new FormData()
      formdata.append('name',userData.name)
      formdata.append('phone',userData.phone)
      formdata.append('address',JSON.stringify(userData.address))
      formdata.append('gender',userData.gender)
      formdata.append('dob',userData.dob)

      image && formdata.append('image',image)

      const {data} = await axios.post(`${backendUrl}/api/user/update-profile`,formdata,{headers:{token}})

      if(data.success){
        toast.success(data.message)
        await loadUserProfileData()
        setIsEdit(false)
        setImage(false)
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error)
    }
  }
  // Ensure default structure for userData
  const defaultUserData = {
    name: "",
    email: "",
    phone: "",
    address: {
      line1: "",
      line2: "",
    },
    gender: "",
    dob: "",
    image: "",
  };

  const currentUserData = { ...defaultUserData, ...userData };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      {/* Profile Header */}
      <div className="flex items-center space-x-4 mb-6">
        {
      isEdit
        ?<label htmlFor="image">
          <div className="inline-block relative cursor-pointer">
            <img className="w-36 rounded backdrop-opacity-75" src={image ? URL.createObjectURL(image):userData.image} alt="" />
            <img className="w-10 absolute bottom-12 right-12" src={image ? "":assets.upload_icon} alt="" />
          </div>
          <input onClick={(e) => setImage(e.target.files[0])} type="file" id="image" hidden/>
        </label>
        :
        <img
          src={currentUserData.image || "https://via.placeholder.com/150"}
          alt="Profile"
          className="w-24 h-24 rounded-full border-2 border-gray-300"
        />
      }
        {isEdit ? (
          <input
            value={currentUserData.name}
            type="text"
            className="text-2xl font-semibold border-b-2 border-gray-300 focus:outline-none"
            onChange={(e) =>
              setUserData((prev) => ({ ...prev, name: e.target.value }))
            }
          />
        ) : (
          <p className="text-2xl font-semibold">{currentUserData.name}</p>
        )}
      </div>

      <hr className="my-4" />

      {/* Contact Info */}
      <div className="mb-6">
        <h2 className="text-lg font-bold text-gray-700 mb-4">Contact Info</h2>
        <div className="space-y-2">
          <div>
            <p className="font-medium text-gray-600">Email:</p>
            <p className="text-gray-800">{currentUserData.email}</p>
          </div>
          <div>
            <p className="font-medium text-gray-600">Phone:</p>
            {isEdit ? (
              <input
                type="text"
                value={currentUserData.phone}
                className="w-full border-b-2 border-gray-300 focus:outline-none"
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, phone: e.target.value }))
                }
              />
            ) : (
              <p className="text-gray-800">{currentUserData.phone}</p>
            )}
          </div>
          <div>
            <p className="font-medium text-gray-600">Address:</p>
            {isEdit ? (
              <div className="space-y-2">
                <input
                  type="text"
                  value={currentUserData.address.line1}
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
                  value={currentUserData.address.line2}
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
                {currentUserData.address.line1}
                <br />
                {currentUserData.address.line2}
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
                value={currentUserData.gender}
                className="w-full border-b-2 border-gray-300 focus:outline-none"
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, gender: e.target.value }))
                }
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            ) : (
              <p className="text-gray-800">{currentUserData.gender}</p>
            )}
          </div>
          <div>
            <p className="font-medium text-gray-600">Birthdate:</p>
            {isEdit ? (
              <input
                type="date"
                value={currentUserData.dob}
                className="w-full border-b-2 border-gray-300 focus:outline-none"
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, dob: e.target.value }))
                }
              />
            ) : (
              <p className="text-gray-800">{currentUserData.dob}</p>
            )}
          </div>
        </div>
      </div>

      {/* Edit/View Toggle */}
      <div className="text-right">
        {isEdit ? (
          <button
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
            onClick={updateuserprofiledata}
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
