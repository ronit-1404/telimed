import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white shadow-lg border border-gray-200 py-10">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-6">
        {/* Left */}
        <div className="space-y-4">
          <img src="" alt="logo" className="h-16 w-auto" />
          <p className="text-gray-600 text-sm leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Saepe vel
            dolores voluptatem odit quo, quibusdam velit error ipsum unde ex
            repudiandae cum inventore atque dolorum dolor quasi a. Deserunt,
            corrupti.
          </p>
        </div>

        {/* Middle */}
        <div>
          <p className="text-lg font-semibold mb-4 text-gray-900">Company</p>
          <ul className="space-y-2">
            <li className="hover:text-gray-700 cursor-pointer transition-colors duration-200">
              Home
            </li>
            <li className="hover:text-gray-700 cursor-pointer transition-colors duration-200">
              About Us
            </li>
            <li className="hover:text-gray-700 cursor-pointer transition-colors duration-200">
              Contact Us
            </li>
            <li className="hover:text-gray-700 cursor-pointer transition-colors duration-200">
              Privacy Policy
            </li>
          </ul>
        </div>

        {/* Right */}
        <div>
          <p className="text-lg font-semibold mb-4 text-gray-900">Get in Touch</p>
          <ul className="space-y-2">
            <li className="text-gray-600">+91 9887766554</li>
            <li className="text-gray-600 hover:text-gray-700 cursor-pointer transition-colors duration-200">
              support@telemed.in
            </li>
          </ul>
        </div>
      </div>

      <div className="text-center text-gray-500 text-sm mt-8">
        &copy; 2025 Ronit. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
