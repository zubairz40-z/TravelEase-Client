import React from "react";
import { NavLink } from "react-router";

const Footer = () => {
  return (
    <footer className="px-6 divide-y bg-white text-gray-700">
      <div className="max-w-7xl mx-auto py-8 flex flex-col lg:flex-row lg:justify-between space-y-6 lg:space-y-0">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <NavLink to="/">
            <img src="/sport-car.png" alt="Logo" className="w-12 h-12 object-contain" />
          </NavLink>
          <span className="text-2xl font-bold text-gray-900">Travelease</span>
        </div>

        {/* Links */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {/* Product */}
          <div className="space-y-2">
            <h3 className="tracking-wide uppercase font-semibold">Product</h3>
            <ul className="space-y-1 text-sm">
              <li><NavLink to="/listing" className="hover:text-red-600">Vehicles</NavLink></li>
              <li><a href="#" className="hover:text-red-600">Features</a></li>
              <li><a href="#" className="hover:text-red-600">Pricing</a></li>
              <li><a href="#" className="hover:text-red-600">FAQ</a></li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-2">
            <h3 className="tracking-wide uppercase font-semibold">Company</h3>
            <ul className="space-y-1 text-sm">
              <li><NavLink to="/about" className="font-bold hover:text-red-600">About Us</NavLink></li>
              <li><NavLink to="/contact" className=" hover:text-red-600">Contact</NavLink></li>
              <li><a href="#" className="font-bold  hover:text-red-600">Privacy</a></li>
              <li><a href="#" className="hover:text-red-600">Terms of Service</a></li>
            </ul>
          </div>

          {/* Developers */}
          <div className="space-y-2">
            <h3 className="tracking-wide uppercase font-semibold">Developers</h3>
            <ul className="space-y-1 text-sm">
              <li><a href="#" className="hover:text-red-600">Public API</a></li>
              <li><a href="#" className="hover:text-red-600">Documentation</a></li>
              <li><a href="#" className="hover:text-red-600">Guides</a></li>
            </ul>
          </div>

          {/* Social */}
          <div className="space-y-2">
            <h3 className="tracking-wide uppercase font-semibold">Follow Us</h3>
            <div className="flex space-x-3">
              <a href="#" title="Facebook" className="text-gray-700 hover:text-red-600">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-5 h-5 fill-current">
                  <path d="M32 16c0-8.839-7.167-16-16-16-8.839 0-16 7.161-16 16 0 7.984 5.849 14.604 13.5 15.803v-11.177h-4.063v-4.625h4.063v-3.527c0-4.009 2.385-6.223 6.041-6.223 1.751 0 3.584 0.312 3.584 0.312v3.937h-2.021c-1.984 0-2.604 1.235-2.604 2.5v3h4.437l-0.713 4.625h-3.724v11.177c7.645-1.199 13.5-7.819 13.5-15.803z"></path>
                </svg>
              </a>
              <a href="#" title="Twitter" className="text-gray-700 hover:text-red-600">
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 fill-current">
                  <path d="M23.954 4.569a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.691 8.094 4.066 6.13 1.64 3.161a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.061a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.937 4.937 0 004.604 3.417 9.868 9.868 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63a9.936 9.936 0 002.46-2.548l-.047-.02z"></path>
                </svg>
              </a>
              <a href="#" title="Instagram" className="text-gray-700 hover:text-red-600">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-5 h-5 fill-current">
                  <path d="M16 0c-4.349 0-4.891 0.021-6.593 0.093-1.709 0.084-2.865 0.349-3.885 0.745-1.052 0.412-1.948 0.959-2.833 1.849-0.891 0.885-1.443 1.781-1.849 2.833-0.396 1.020-0.661 2.176-0.745 3.885-0.077 1.703-0.093 2.244-0.093 6.593s0.021 4.891 0.093 6.593c0.084 1.704 0.349 2.865 0.745 3.885 0.412 1.052 0.959 1.948 1.849 2.833 0.885 0.891 1.781 1.443 2.833 1.849 1.020 0.391 2.181 0.661 3.885 0.745 1.703 0.077 2.244 0.093 6.593 0.093s4.891-0.021 6.593-0.093c1.704-0.084 2.865-0.355 3.885-0.745 1.052-0.412 1.948-0.959 2.833-1.849 0.891-0.885 1.443-1.776 1.849-2.833 0.391-1.020 0.661-2.181 0.745-3.885 0.077-1.703 0.093-2.244 0.093-6.593s-0.021-4.891-0.093-6.593c-0.084-1.704-0.355-2.871-0.745-3.885-0.412-1.052-0.959-1.948-1.849-2.833-0.885-0.891-1.776-1.443-2.833-1.849-1.020-0.396-2.181-0.661-3.885-0.745-1.703-0.077-2.244-0.093-6.593-0.093zM16 7.787c-4.541 0-8.213 3.677-8.213 8.213 0 4.541 3.677 8.213 8.213 8.213 4.541 0 8.213-3.677 8.213-8.213 0-4.541-3.677-8.213-8.213-8.213zM26.464 7.459c0 1.063-0.865 1.921-1.923 1.921-1.063 0-1.921-0.859-1.921-1.921 0-1.057 0.864-1.917 1.921-1.917s1.923 0.86 1.923 1.917z"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="py-6 text-sm text-center text-gray-500">
        © 2026 Travelease. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
