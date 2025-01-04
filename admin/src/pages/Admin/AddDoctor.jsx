import React, { useContext, useState } from 'react';
import { AdminContext } from '../../context/AdminContext';
import { toast } from 'react-toastify';
import axios from 'axios';

const AddDoctor = () => {
  const [docimg, setdocimg] = useState(null);
  const [name, setname] = useState('');
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [experience, setexperience] = useState('1 Year');
  const [fees, setfees] = useState('');
  const [about, setabout] = useState('');
  const [speciality, setspeciality] = useState('General Physician');
  const [degree, setdegree] = useState('');
  const [address1, setaddress1] = useState('');
  const [address2, setaddress2] = useState('');

  const { backendUrl, atoken } = useContext(AdminContext);

  const onsubmitHandler = async (e) => {
    e.preventDefault();

    try {
      if (!docimg) {
        return toast.error('Please upload a doctor\'s image.');
      }

      const formData = new FormData();
      formData.append('image', docimg);
      formData.append('name', name);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('experience', experience);
      formData.append('fees', Number(fees));
      formData.append('about', about);
      formData.append('speciality', speciality);
      formData.append('degree', degree);
      formData.append('address', JSON.stringify({ line1: address1, line2: address2 }));

      // Debugging: Log all form data for validation
      for (let [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
      }
      console.log(atoken)
      //here formData is beign passed in request body
      const response = await axios.post(
        `${backendUrl}/api/admin/add-doctor`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${atoken}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        // Clear form inputs on successful submission
        setdocimg(null);
        setname('');
        setemail('');
        setpassword('');
        setexperience('1 Year');
        setfees('');
        setabout('');
        setspeciality('General Physician');
        setdegree('');
        setaddress1('');
        setaddress2('');
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error('Error while adding doctor:', error);
      toast.error(error.response?.data?.message || 'An error occurred while adding the doctor.');
    }
  };

  return (
    <div className="ml-64 pt-16">
      <form
        onSubmit={onsubmitHandler}
        className="max-w-4xl mt-20 pt-20 mx-auto p-8 bg-white shadow-lg rounded-lg"
      >
        <h1 className="text-2xl text-blue-800 font-bold text-center mb-6">Add Doctor</h1>

        <div className="flex flex-col items-center mb-6">
          <label htmlFor="doc-img" className="cursor-pointer">
            <img
              src={docimg ? URL.createObjectURL(docimg) : ''}
              alt="Upload"
              className="w-32 h-32 object-cover rounded-full border-2 border-gray-300 mb-4"
            />
          </label>
          <input
            onChange={(e) => setdocimg(e.target.files[0])}
            type="file"
            id="doc-img"
            accept="image/*"
            hidden
          />
          <p className="text-gray-500">Upload Doctor Picture</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Doctor Name */}
          <div>
            <label className="block mb-2 text-sm font-medium">Doctor Name</label>
            <input
              onChange={(e) => setname(e.target.value)}
              value={name}
              type="text"
              placeholder="Name"
              required
              className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>

          {/* Doctor Email */}
          <div>
            <label className="block mb-2 text-sm font-medium">Doctor Email</label>
            <input
              onChange={(e) => setemail(e.target.value)}
              value={email}
              type="email"
              placeholder="Email"
              required
              className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>

          {/* Doctor Password */}
          <div>
            <label className="block mb-2 text-sm font-medium">Doctor Password</label>
            <input
              onChange={(e) => setpassword(e.target.value)}
              value={password}
              type="password"
              placeholder="Password"
              required
              className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>

          {/* Doctor Experience */}
          <div>
            <label className="block mb-2 text-sm font-medium">Doctor's Experience</label>
            <select
              onChange={(e) => setexperience(e.target.value)}
              value={experience}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            >
              {Array.from({ length: 10 }, (_, i) => (
                <option key={i} value={`${i + 1} Year`}>
                  {i + 1} Year
                </option>
              ))}
            </select>
          </div>

          {/* Fees */}
          <div>
            <label className="block mb-2 text-sm font-medium">Fees</label>
            <input
              onChange={(e) => setfees(e.target.value)}
              value={fees}
              type="number"
              placeholder="Fees"
              required
              className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>

          {/* Specialty */}
          <div>
            <label className="block mb-2 text-sm font-medium">Speciality</label>
            <select
              onChange={(e) => setspeciality(e.target.value)}
              value={speciality}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            >
              {['General Physician', 'Gynecologist', 'Dermatologist', 'Pediatricians', 'Neurologist', 'Gastroenterologist'].map((spec) => (
                <option key={spec} value={spec}>
                  {spec}
                </option>
              ))}
            </select>
          </div>

          {/* Education */}
          <div>
            <label className="block mb-2 text-sm font-medium">Education</label>
            <input
              onChange={(e) => setdegree(e.target.value)}
              value={degree}
              type="text"
              placeholder="Education"
              required
              className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>

          {/* Address */}
          <div>
            <label className="block mb-2 text-sm font-medium">Address</label>
            <input
              onChange={(e) => setaddress1(e.target.value)}
              value={address1}
              type="text"
              placeholder="Address 1"
              required
              className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300 mb-2"
            />
            <input
              onChange={(e) => setaddress2(e.target.value)}
              value={address2}
              type="text"
              placeholder="Address 2"
              required
              className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
        </div>

        {/* About */}
        <div className="mt-6">
          <label className="block mb-2 text-sm font-medium">About Doctor</label>
          <textarea
            onChange={(e) => setabout(e.target.value)}
            value={about}
            placeholder="Write about doctor"
            rows={5}
            required
            className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full mt-6 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
        >
          Add Doctor
        </button>
      </form>
    </div>
  );
};

export default AddDoctor;
