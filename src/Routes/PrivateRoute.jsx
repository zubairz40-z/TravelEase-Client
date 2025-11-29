
import React from "react";
import { Navigate, NavLink, useLocation } from "react-router";
import { useAuth } from "../Providers/AuthProvider";

const PrivateRoute =({children})=>{
    const {user,loading}=useAuth();
    const location =useLocation();

    if(loading){
        return(
            <div className="min-h-[60vh] flex items-center justify-center">
                <p className="text-sm text-slate-800">Loading...</p>
            </div>
        )

    }
    if(!user){
        return <Navigate to ="/Login" state={{ from: location }} replace />;
  }

  return children;
};
  
export default PrivateRoute;