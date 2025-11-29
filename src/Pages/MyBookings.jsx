import React from "react";
import { useAuth } from "../Providers/AuthProvider";

const MyBookings =()=>{

    const {user} = useAuth()
    return(
       <div className="max-w-5xl mx-auto px-4 py-8">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
            My Bookings
        </h1>
        <p className="text-sm text-red-600">All the vehicles you have booked will be shown here.</p>
       
         {user && (
        <p className="text-xs text-slate-500 mb-4">
          Showing bookings for: <span className="font-medium">{user.email}</span>
        </p>
      )}

      {/* Later: fetch bookings by userEmail from backend */}
      <div className="border border-dashed border-slate-300 rounded-xl p-6 text-sm text-slate-500">
        Booking data will appear here after we connect the API.
      </div>
    </div>


    )
}

export default MyBookings;