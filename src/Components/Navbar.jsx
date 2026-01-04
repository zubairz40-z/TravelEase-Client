import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { useAuth } from "../Providers/AuthProvider";
import toast from "react-hot-toast";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const navLinkClass = ({ isActive }) =>
    `px-4 py-1.5 text-sm font-semibold rounded-full transition-colors duration-150
     ${
       isActive
         ? "bg-white text-red-600 shadow-sm"
         : "text-white hover:bg-red-500"
     }`;

  const handleLogout = () => {
    logout()
      .then(() => {
        toast.success("Logged Out");
        navigate("/login");
      })
      .catch(() => toast.error("Logout failed"));
  };

  const closeMenu = () => {
    setIsOpen(false);
    setShowProfile(false);
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-red-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* LOGO */}
          <div className="flex items-center gap-3">
            <NavLink to="/" onClick={closeMenu}>
              <img src="/sport-car.png" alt="Logo" className="w-10 h-10" />
            </NavLink>
            <NavLink to="/" onClick={closeMenu}>
              <h2 className="text-xl font-bold text-white">TravelEase</h2>
            </NavLink>
          </div>

          {/* DESKTOP NAV */}
          <nav className="hidden lg:flex items-center gap-3">
            <NavLink to="/" className={navLinkClass}>Home</NavLink>
            <NavLink to="/all-vehicles" className={navLinkClass}>All Vehicles</NavLink>
            <NavLink to="/compare" className={navLinkClass}>Compare</NavLink> {/* ADDED */}

            {user && (
              <>
                <NavLink to="/dashboard" className={navLinkClass}>Dashboard</NavLink>
                <NavLink to="/dashboard/bookings" className={navLinkClass}>My Bookings</NavLink>
                <NavLink to="/dashboard/profile" className={navLinkClass}>Profile</NavLink>
              </>
            )}
          </nav>

          {/* RIGHT SIDE DESKTOP */}
          <div className="hidden lg:flex items-center gap-4">
            {!user ? (
              <>
                <NavLink to="/login" className={navLinkClass}>Login</NavLink>
                <NavLink to="/register">
                  <button className="px-4 py-2 text-sm font-bold rounded-full bg-white text-red-600 hover:bg-red-100 transition">
                    Register
                  </button>
                </NavLink>
              </>
            ) : (
              <div className="relative">
                {/* AVATAR */}
                <button onClick={() => setShowProfile((prev) => !prev)} className="flex items-center gap-2 focus:outline-none">
                  {user.photoURL ? (
                    <img src={user.photoURL} alt="User" className="h-9 w-9 rounded-full border border-white object-cover" />
                  ) : (
                    <div className="h-9 w-9 rounded-full bg-white text-red-600 flex items-center justify-center font-bold">
                      {user.displayName?.[0] || user.email?.[0]}
                    </div>
                  )}
                </button>

                {/* PROFILE DROPDOWN */}
                {showProfile && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg overflow-hidden">
                    <nav className="flex flex-col">
                      <NavLink to="/dashboard/profile" onClick={closeMenu} className={({ isActive }) =>
                        `px-4 py-2 text-sm transition-colors duration-200 ${isActive ? "bg-red-100 text-red-600" : "hover:bg-red-50"}`
                      }>Profile</NavLink>

                      <NavLink to="/dashboard/add-vehicle" onClick={closeMenu} className={({ isActive }) =>
                        `px-4 py-2 text-sm transition-colors duration-200 ${isActive ? "bg-red-100 text-red-600" : "hover:bg-red-50"}`
                      }>Add Vehicle</NavLink>

                      <NavLink to="/dashboard/bookings" onClick={closeMenu} className={({ isActive }) =>
                        `px-4 py-2 text-sm transition-colors duration-200 ${isActive ? "bg-red-100 text-red-600" : "hover:bg-red-50"}`
                      }>My Bookings</NavLink>

                      <button onClick={handleLogout} className="px-4 py-2 text-sm text-left transition-colors duration-200 hover:bg-red-50">Logout</button>
                    </nav>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* MOBILE BUTTON */}
          <button onClick={() => setIsOpen((prev) => !prev)} className="lg:hidden p-2 border border-white rounded-md text-white">
            ☰
          </button>
        </div>

        {/* MOBILE MENU */}
        {isOpen && (
          <div className="lg:hidden border-t border-red-500 pb-4">
            <nav className="flex flex-col gap-2 pt-3">
              <NavLink to="/" onClick={closeMenu} className={navLinkClass}>Home</NavLink>
              <NavLink to="/all-vehicles" onClick={closeMenu} className={navLinkClass}>All Vehicles</NavLink>
              <NavLink to="/compare" onClick={closeMenu} className={navLinkClass}>Compare</NavLink> {/* ADDED */}

              {user && (
                <>
                  <NavLink to="/dashboard" onClick={closeMenu} className={navLinkClass}>Dashboard</NavLink>
                  <NavLink to="/dashboard/bookings" onClick={closeMenu} className={navLinkClass}>My Bookings</NavLink>
                  <NavLink to="/dashboard/profile" onClick={closeMenu} className={navLinkClass}>Profile</NavLink>

                  <button
                    onClick={() => {
                      closeMenu();
                      handleLogout();
                    }}
                    className="w-full px-4 py-2 text-sm font-bold rounded-full bg-white text-red-600"
                  >
                    Log Out
                  </button>
                </>
              )}

              {!user && (
                <div className="flex flex-col gap-2">
                  <NavLink to="/login" onClick={closeMenu} className="px-4 py-2 text-center rounded-full bg-white text-red-600">Login</NavLink>
                  <NavLink to="/register" onClick={closeMenu} className="px-4 py-2 text-center rounded-full bg-red-500 text-white">Register</NavLink>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
