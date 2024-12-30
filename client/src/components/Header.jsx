import React from 'react';

const Header = () => {
  return (
    <div className="flex flex-col md:flex-row items-center bg-primary rounded-lg px-6 md:px-10 lg:px-20 py-10">
      
      {/* Left Section */}
      <div className="md:w-1/2 flex flex-col items-start justify-center gap-6 py-6 md:py-[10vh]">
        <p className="text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight">
          Book Appointment <br /> With Trusted Doctors
        </p>
        <p className="text-white text-sm md:text-base">
          Simply browse through our extensive list of trusted doctors, <br />
          and schedule your appointment hassle-free.
        </p>
        <a 
          href="#speciality" 
          className="inline-flex items-center gap-2 bg-white text-primary font-medium py-2 px-4 rounded-lg shadow hover:bg-gray-100 transition-all hover:scale-105 duration-300">
          Book Appointment 
          <img src="/path/to/arrow-icon.png" alt="arrow icon" className="w-4 h-4" />
        </a>
      </div>

      {/* Right Section */}
      <div className="md:w-1/2 relative mt-6 md:mt-0">
        <img 
          className="w-full h-auto rounded-lg md:absolute md:bottom-0" 
          src="/path/to/header-image.png" 
          alt="header illustration" 
        />
      </div>
    </div>
  );
};

export default Header;
