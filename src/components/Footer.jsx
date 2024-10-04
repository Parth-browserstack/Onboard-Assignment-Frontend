
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4 mt-auto ">
      <div className="container mx-auto text-center">
        <p className="text-lg font-semibold">
          &copy; {new Date().getFullYear()} &nbsp;
          <span className="text-blue-400">BrowserStack</span> Onboarding Assignment
        </p>
        <p className="text-sm">
          by <span className="font-bold">Parth Shukla</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
