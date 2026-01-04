// router.jsx
import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/Home";
import AllVehicles from "../Pages/AllVehicles";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import ErrorPage from "../Pages/ErrorPage";
import VehicleDetails from "../Pages/VehicleDetails";
import PrivateRoute from "./PrivateRoute";

// Dashboard
import DashboardLayout from "../Dashboard/DashboardLayout";
import Overview from "../Dashboard/Overview";
import AddVehicle from "../Dashboard/AddVehicle";
import MyVehicles from "../Dashboard/MyVehicles";
import MyBookings from "../Dashboard/MyBookings";
import UpdateVehicles from "../Dashboard/UpdateVehicle";
import Profile from "../Dashboard/Profile";

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/all-vehicles", element: <AllVehicles /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },

      {
        path: "/vehicles/:id",
        element: (
          <PrivateRoute>
            <VehicleDetails />
          </PrivateRoute>
        ),
      },
    ],
  },

  // 🔐 DASHBOARD
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      { index: true, element: <Overview /> },
      { path: "add-vehicle", element: <AddVehicle /> },
      { path: "my-vehicles", element: <MyVehicles /> },
      { path: "bookings", element: <MyBookings /> },
      { path: "update-vehicle/:id", element: <UpdateVehicles /> },
      { path: "profile", element: <Profile /> },
    ],
  },

  { path: "*", element: <ErrorPage /> },
]);

export default router;
