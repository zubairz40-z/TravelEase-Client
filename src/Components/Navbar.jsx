import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { useAuth } from "../Providers/AuthProvider";
import toast from "react-hot-toast";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const navLinkClass = ({ isActive }) =>
    `px-4 py-1.5 text-sm font-semibold rounded-full transition-colors duration-150
      ${
        isActive
          ? "bg-red-600 text-white shadow-sm"
          : "text-slate-800 hover:bg-red-50 hover:text-red-700"
      }`;

  const handleLogout = () => {
    logout()
      .then(() => {
        toast.success("Logged Out");
        navigate("/");
      })
      .catch(() => toast.error("Logout failed"));
  };

  const closeMenu = () => setIsOpen(false);

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* TOP BAR */}
        <div className="flex items-center justify-between h-16 gap-3">
          {/* LOGO + NAME */}
          <div className="flex items-center gap-3">
            <NavLink to="/" onClick={closeMenu}>
              <img src="/sport-car.png" alt="Logo" className="w-10 h-10" />
            </NavLink>

            <NavLink to="/" onClick={closeMenu}>
              <h3 className="text-2xl font-bold tracking-tight text-slate-900">
                TravelEase
              </h3>
            </NavLink>
          </div>

          {/* NAV LINKS (DESKTOP) */}
          <nav className="hidden lg:flex gap-x-4 items-center">
            <NavLink to="/" className={navLinkClass}>
              Home
            </NavLink>

            <NavLink to="/All-Vehicles" className={navLinkClass}>
              All Vehicles
            </NavLink>

            <NavLink to="/Add-Vehicles" className={navLinkClass}>
              Add Vehicle
            </NavLink>

            <NavLink to="/MyBookings" className={navLinkClass}>
              My Bookings
            </NavLink>

            <NavLink to="/My-Vehicles" className={navLinkClass}>
              My Vehicles
            </NavLink>
          </nav>

          {/* RIGHT SIDE (DESKTOP) */}
          <div className="hidden lg:flex items-center gap-4">
            {user ? (
              <>
                {/* Avatar */}
                <div
                  className="flex items-center gap-2"
                  title={user.displayName || user.email}
                >
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt="User"
                      className="h-9 w-9 rounded-full object-cover border border-slate-300"
                    />
                  ) : (
                    <div className="h-9 w-9 rounded-full bg-red-600 text-white flex items-center justify-center text-sm font-semibold">
                      {user.displayName?.[0]?.toUpperCase() ||
                        user.email?.[0]?.toUpperCase()}
                    </div>
                  )}
                </div>

                {/* Logout */}
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-sm rounded-full font-bold text-white bg-red-600 border border-red-600 hover:bg-transparent hover:text-red-600 transition-all"
                >
                  Log Out
                </button>
              </>
            ) : (
              <>
                <NavLink to="/Login" className={navLinkClass}>
                  Login
                </NavLink>

                <NavLink to="/Register">
                  <button className="px-4 py-2.5 text-sm rounded-full font-bold text-white bg-red-600 border border-red-600 hover:bg-transparent hover:text-red-600 transition-all">
                    Register
                  </button>
                </NavLink>
              </>
            )}
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            className="lg:hidden inline-flex items-center justify-center p-2 border border-slate-300 rounded-md"
            onClick={() => setIsOpen((prev) => !prev)}
          >
            <svg
              className="h-5 w-5 text-slate-800"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* MOBILE MENU */}
        {isOpen && (
          <div className="lg:hidden border-t border-slate-200 pb-4">
            <nav className="flex flex-col gap-2 pt-3">
              <NavLink
                to="/"
                className={navLinkClass}
                onClick={closeMenu}
              >
                Home
              </NavLink>

              <NavLink
                to="/All-Vehicles"
                className={navLinkClass}
                onClick={closeMenu}
              >
                All Vehicles
              </NavLink>

              <NavLink
                to="/Add-Vehicles"
                className={navLinkClass}
                onClick={closeMenu}
              >
                Add Vehicle
              </NavLink>

              <NavLink
                to="/MyBookings"
                className={navLinkClass}
                onClick={closeMenu}
              >
                My Bookings
              </NavLink>

              <NavLink
                to="/My-Vehicles"
                className={navLinkClass}
                onClick={closeMenu}
              >
                My Vehicles
              </NavLink>
            </nav>

            <div className="mt-3 flex flex-col gap-2">
              {user ? (
                <>
                  <button
                    onClick={() => {
                      closeMenu();
                      handleLogout();
                    }}
                    className="w-full px-4 py-2 text-sm rounded-full font-bold text-white bg-red-600 border border-red-600 hover:bg-transparent hover:text-red-600 transition-all"
                  >
                    Log Out
                  </button>
                </>
              ) : (
                <>
                  <NavLink
                    to="/Login"
                    onClick={closeMenu}
                    className="w-full"
                  >
                    <div className="w-full text-center px-4 py-2 text-sm font-semibold rounded-full text-slate-800 border border-slate-300 hover:bg-red-50 hover:text-red-700 transition-colors">
                      Login
                    </div>
                  </NavLink>

                  <NavLink
                    to="/Register"
                    onClick={closeMenu}
                    className="w-full"
                  >
                    <div className="w-full text-center px-4 py-2 text-sm font-bold rounded-full text-white bg-red-600 border border-red-600 hover:bg-transparent hover:text-red-600 transition-all">
                      Register
                    </div>
                  </NavLink>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
