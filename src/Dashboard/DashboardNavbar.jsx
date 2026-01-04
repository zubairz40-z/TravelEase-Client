import { NavLink, useNavigate } from "react-router";
import { useState } from "react";
import { useAuth } from "../Providers/AuthProvider";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const navLinkClass = ({ isActive }) =>
    isActive
      ? "text-red-600 font-medium"
      : "text-slate-700 hover:text-red-600";

  return (
    <nav className="bg-white border-b shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <NavLink to="/" className="text-xl font-bold text-slate-900">
            CarRent
          </NavLink>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            <NavLink to="/" className={navLinkClass}>
              Home
            </NavLink>

            <NavLink to="/all-vehicles" className={navLinkClass}>
              All Vehicles
            </NavLink>

            {user && (
              <>
                <NavLink
                  to="/dashboard"
                  className={navLinkClass}
                >
                  Dashboard
                </NavLink>

                <NavLink
                  to="/dashboard/bookings"
                  className={navLinkClass}
                >
                  My Bookings
                </NavLink>
              </>
            )}

            {!user ? (
              <>
                <NavLink to="/login" className={navLinkClass}>
                  Login
                </NavLink>
                <NavLink
                  to="/register"
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Register
                </NavLink>
              </>
            ) : (
              <div className="relative group">
                <button className="flex items-center gap-2">
                  <img
                    src={user.photoURL || "https://i.pravatar.cc/40"}
                    alt="profile"
                    className="h-9 w-9 rounded-full border"
                  />
                </button>

                {/* Dropdown */}
                <div className="absolute right-0 mt-2 w-44 bg-white border rounded shadow-lg opacity-0 group-hover:opacity-100 invisible group-hover:visible transition">
                  <NavLink
                    to="/dashboard/profile"
                    className="block px-4 py-2 text-sm hover:bg-slate-100"
                  >
                    Profile
                  </NavLink>

                  <NavLink
                    to="/dashboard/add-vehicle"
                    className="block px-4 py-2 text-sm hover:bg-slate-100"
                  >
                    Add Vehicle
                  </NavLink>

                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-slate-100"
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-slate-800"
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-4 py-3 flex flex-col gap-3">
            <NavLink to="/" onClick={() => setMenuOpen(false)}>
              Home
            </NavLink>

            <NavLink to="/all-vehicles" onClick={() => setMenuOpen(false)}>
              All Vehicles
            </NavLink>

            {user && (
              <>
                <NavLink to="/dashboard" onClick={() => setMenuOpen(false)}>
                  Dashboard
                </NavLink>

                <NavLink
                  to="/dashboard/bookings"
                  onClick={() => setMenuOpen(false)}
                >
                  My Bookings
                </NavLink>

                <NavLink
                  to="/dashboard/profile"
                  onClick={() => setMenuOpen(false)}
                >
                  Profile
                </NavLink>

                <button
                  onClick={handleLogout}
                  className="text-left text-red-600"
                >
                  Logout
                </button>
              </>
            )}

            {!user && (
              <>
                <NavLink to="/login" onClick={() => setMenuOpen(false)}>
                  Login
                </NavLink>
                <NavLink to="/register" onClick={() => setMenuOpen(false)}>
                  Register
                </NavLink>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
