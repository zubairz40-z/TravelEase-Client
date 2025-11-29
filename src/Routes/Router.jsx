import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Home from "../Pages/Home";
import MainLayout from './../Layouts/MainLayout';
import AllVehicles from "../Pages/AllVehicles";
import MyVehicles from "../Pages/MyVehicles";
import AddVehicles from "../Pages/AddVehicle";
import MyBookings from './../Pages/MyBookings';
import Register from "../Pages/Register";
import ErrorPage from "../Pages/ErrorPage";
import Login from './../Pages/Login';



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
        element:<AddVehicles></AddVehicles>
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
    ]
  },
]);

 

export default router;