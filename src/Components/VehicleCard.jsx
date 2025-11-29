import React from "react";
import { NavLink } from 'react-router';

const VehicleCard =({vehicle})=>{
    

     const {
    _id,
    vehicleName,
    category,
    pricePerDay,
    location,
    availability,
    coverImage,
  } = vehicle || {}; 

  return(
    <div className="bg-white rounded-2xl border border-slate-200/70 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden max-w-sm w-full mx-auto">
        <div className="relative aspect-video overflow-hidden">

            <img src={coverImage} alt={vehicleName}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform" />

           <span
          className={`absolute top-2 left-2 px-2 py-1 text-xs font-medium rounded-full text-white ${
            availability === 'Available' ? 'bg-emerald-500' : 'bg-rose-500'
          }`}
          // 
        >
          {availability}
        </span>
      </div>

      <div className="p-4 flex-1 flex flex-col">
        <h3 className="text-lg font-semibold text-slate-900 mb-1">{vehicleName}</h3>
<div className="mb-3">
     <p>
    <span className="font-semibold text-slate-700">Category:</span>{" "}
    <span>{category}</span>
  </p>

  <p >
    <span className="font-semibold text-slate-700">Location:</span>{" "}
    <span>{location}</span>
  </p>
  </div>
        <NavLink to={`/vehicles/${_id}`} // e.g. /vehicles/1
          className="mt-auto inline-flex items-center justify-center w-full px-3 py-2 rounded-lg bg-red-600 text-white text-sm font-medium hover:bg-red-700 transition-colors"
        >
          View Details</NavLink>
      </div>

        

        </div>
  
  )
}

export default VehicleCard;