import { NavLink, Outlet } from "react-router";

const DashboardLayout = () => {
  const menuItems = [
    { name: "Overview", path: "/dashboard" },
    { name: "My Bookings", path: "/dashboard/bookings" },
    { name: "Add Vehicle", path: "/dashboard/add-vehicle" },
    { name: "My Vehicles", path: "/dashboard/my-vehicles" },
    { name: "Profile", path: "/dashboard/profile" },
  ];

  const linkClass = ({ isActive }) =>
    `block px-4 py-2 rounded-md transition-colors duration-200 ${
      isActive
        ? "bg-red-600 text-white font-semibold"
        : "text-gray-200 hover:bg-red-500 hover:text-white"
    }`;

  return (
    <div className="flex min-h-screen bg-slate-100">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white p-6 flex flex-col">

        {/* LOGO */}
        <div className="flex items-center gap-3 mb-4">
          <NavLink to="/">
            <img src="/sport-car.png" alt="Logo" className="w-10 h-10" />
          </NavLink>
          <NavLink to="/">
            <h2 className="text-xl font-bold text-white">TravelEase</h2>
          </NavLink>
        </div>

        {/* GO HOME BUTTON */}
        <NavLink
          to="/"
          className="mb-6 inline-flex items-center justify-center px-4 py-2 text-sm font-semibold rounded-md bg-white text-red-600 hover:bg-red-100 transition"
        >
          ← Go to Home
        </NavLink>

        {/* Dashboard Title */}
        <h2 className="text-lg font-semibold text-slate-300 mb-4">
          Dashboard
        </h2>

        {/* Menu */}
        <nav className="flex-1 flex flex-col gap-2">
          {menuItems.map((item) => (
            <NavLink key={item.path} to={item.path} className={linkClass}>
              {item.name}
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        <div className="mt-auto text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} TravelEase
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
