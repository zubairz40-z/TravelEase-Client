import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router";
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
import PrivateRoute from './PrivateRoute';
import UpdateVehicles from "../Pages/UpdateVehicle";




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
        element:(
    <PrivateRoute>
      <AddVehicle></AddVehicle>
    </PrivateRoute>)
      },
       {
        path:"/My-Vehicles",
        element:(
    <PrivateRoute>
      <MyVehicles />
    </PrivateRoute>
  ),
      },
       {
        path:"/MyBookings",
        element:(
    <PrivateRoute>
      <MyBookings></MyBookings>
    </PrivateRoute>
  ),
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
        
  element:(
    <PrivateRoute>
      <VehicleDetails />,
    </PrivateRoute>
    
  ) 
      },
      {
        path:"update-vehicle/:id",
        element:(
          <PrivateRoute>
            <UpdateVehicles></UpdateVehicles>
          </PrivateRoute>
        )
      },
    ]
  },
]);

 

export default router;