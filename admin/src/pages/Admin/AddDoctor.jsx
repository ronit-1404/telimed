import React from 'react';

const AddDoctor = () => {
  return (
    <div className="ml-64 pt-16">
      <form className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold text-center mb-6">Add Doctor</h1>

        <div className="flex flex-col items-center mb-6">
          <label htmlFor="doc-img" className="cursor-pointer">
            <img
              src=""
              alt="Upload"
              className="w-32 h-32 object-cover rounded-full border-2 border-gray-300 mb-4"
            />
          </label>
          <input type="file" id="doc-img" hidden />
          <p className="text-gray-500">Upload Doctor Picture</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-2 text-sm font-medium">Doctor Name</label>
            <input
              type="text"
              placeholder="Name"
              required
              className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium">Doctor Email</label>
            <input
              type="email"
              placeholder="Email"
              required
              className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium">Doctor Password</label>
            <input
              type="password"
              placeholder="Password"
              required
              className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium">Doctor's Experience</label>
            <select
              className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            >
              <option value="1 Year">1 Year</option>
              <option value="2 Year">2 Year</option>
              <option value="3 Year">3 Year</option>
              <option value="4 Year">4 Year</option>
              <option value="5 Year">5 Year</option>
              <option value="6 Year">6 Year</option>
              <option value="7 Year">7 Year</option>
              <option value="8 Year">8 Year</option>
              <option value="9 Year">9 Year</option>
              <option value="10 Year">10 Year</option>
            </select>
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium">Fees</label>
            <input
              type="number"
              placeholder="Fees"
              required
              className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium">Speciality</label>
            <select
              className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            >
              <option value="General Physician">General Physician</option>
              <option value="Gynecologist">Gynecologist</option>
              <option value="Dermatologist">Dermatologist</option>
              <option value="Pediatricians">Pediatricians</option>
              <option value="Neurologist">Neurologist</option>
              <option value="Gastroenterologist">Gastroenterologist</option>
            </select>
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium">Education</label>
            <input
              type="text"
              placeholder="Education"
              required
              className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium">Address</label>
            <input
              type="text"
              placeholder="Address 1"
              required
              className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300 mb-2"
            />
            <input
              type="text"
              placeholder="Address 2"
              required
              className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
        </div>

        <div className="mt-6">
          <label className="block mb-2 text-sm font-medium">About Doctor</label>
          <textarea
            placeholder="Write about doctor"
            rows={5}
            required
            className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>

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
