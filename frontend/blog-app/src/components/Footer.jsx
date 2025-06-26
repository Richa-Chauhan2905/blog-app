import React from "react";
import { FaGithub } from "react-icons/fa";
import { BsYoutube } from "react-icons/bs";
import { FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <>
      <footer className="bg-white text-gray-800 py-10 px-4 md:px-10 border-t">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center md:text-start">
            <h2 className="text-lg font-semibold mb-4 text-gray-900">Products</h2>
            <ul className="space-y-2">
              {["Flutter", "React", "Android", "iOS"].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-blue-600 transition duration-200">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="text-center md:text-start">
            <h2 className="text-lg font-semibold mb-4 text-gray-900">Design to Code</h2>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-blue-600 transition duration-200">Figma Plugin</a></li>
              <li><a href="#" className="hover:text-blue-600 transition duration-200">Templates</a></li>
            </ul>
          </div>

          <div className="text-center md:text-start">
            <h2 className="text-lg font-semibold mb-4 text-gray-900">Comparison</h2>
            <ul className="space-y-2">
              {[
                "DhiWise vs Anima", "DhiWise vs Appsmith", "DhiWise vs FlutterFlow",
                "DhiWise vs Monday Hero", "DhiWise vs Retool", "DhiWise vs Bubble", "DhiWise vs Figma Dev Mode"
              ].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-blue-600 transition duration-200">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="text-center md:text-start">
            <h2 className="text-lg font-semibold mb-4 text-gray-900">Company</h2>
            <ul className="space-y-2">
              {["About Us", "Contact Us", "Career", "Terms of Service", "Privacy Policy"].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-blue-600 transition duration-200">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </footer>

      <div className="bg-gray-100 py-4 px-4 md:px-10 border-t">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-3 text-sm text-gray-600">
          <div className="text-xl font-semibold text-gray-900">
            Cilli<span className="text-blue-500 font-bold">Blog</span>
          </div>

          <p className="text-center md:text-start">&copy; 2024 DhiWise PVT. LTD. All rights reserved</p>

          <div className="flex space-x-4">
            <a href="#"><FaGithub className="h-5 w-5 hover:text-gray-900" /></a>
            <a href="#"><BsYoutube className="h-5 w-5 hover:text-red-500" /></a>
            <a href="#"><FaLinkedin className="h-5 w-5 hover:text-blue-600" /></a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
