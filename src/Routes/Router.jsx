import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Home from "../Pages/Home";
import MainLayout from './../Layouts/MainLayout';
import AllVehicles from "../Pages/AllVehicles";
import MyVehicles from "../Pages/MyVehicles";
import AddVehicle from "../Pages/AddVehicle";
import MyBookings from './../Pages/MyBookings';
import Register from "../Pages/Register";
import ErrorPage from "../Pages/ErrorPage";
import Login from './../Pages/Login';
import VehicleDetails from "../Pages/VehicleDetails";



const router = createBrowserRouter([
  {
    path: "/",
    element:<MainLayout></MainLayout>,
    children:[
      {
        path:"",
        element:<Home></Home>
      },
       {
        path:"/All-Vehicles",
        element:<AllVehicles></AllVehicles>
      },
       {
        path:"/Add-Vehicles",
        element:<AddVehicle></AddVehicle>
      },
       {
        path:"/My-Vehicles",
        element:<MyVehicles></MyVehicles>
      },
       {
        path:"/MyBookings",
        element:<MyBookings></MyBookings>
      },
      {
      
        path:"/Login",
        element:<Login></Login>
      },
       {
        path:"/Register",
        element:<Register></Register>
      },
       {
        path:"*",
        element:<ErrorPage></ErrorPage>
      },
      {
        path: "vehicles/:id",
  element: <VehicleDetails />,
      }
    ]
  },
]);

 

export default router;