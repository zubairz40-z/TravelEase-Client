import React from "react";
import { useAuth } from "../Providers/AuthProvider";

const MyVehicles =()=>{

    const {user}=useAuth();

    return(
       <div className="max-w-5xl mx-auto px-4 py-8 min-h-[80vh]">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">My Vehicles</h1>

        <p className="text-sm text-slate-600 mb-4">Vehicles listed using your account</p>

         {!user && (
        <p className="text-sm text-red-600">
          You must be logged in to see your vehicles.
        </p>
      )}

      {user && (
        <p className="text-xs text-slate-500 mb-4">
          Currently logged in as: <span className="font-medium">{user.email}</span>
        </p>
      )}

       <div className="border border-dashed border-slate-300 rounded-xl p-6 text-sm text-slate-500">
        My vehicles list will appear here after connecting to the backend.
      </div>
    </div>

    )
}

export default MyVehicles;