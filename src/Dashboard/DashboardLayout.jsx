import { Outlet } from "react-router";

const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white p-4">
        Dashboard Menu
      </aside>

      {/* Content */}
      <main className="flex-1 p-6 bg-slate-100">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
