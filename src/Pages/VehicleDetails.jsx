import React from "react";
import { NavLink, useNavigate, useParams } from "react-router";
import { fakeVehicles } from "../Components/fakeVehicles";
import { IoMdArrowRoundBack } from "react-icons/io";

const VehicleDetails =()=>{
    const {id} = useParams();
    const navigate =useNavigate();

    const vehicle = fakeVehicles.find((v)=>v._id===id)

    if(!vehicle){
        return(
            <div className="max-w-4xl mx-auto py-10 px-4">
                <p className="text-red-600 font-medium">
                    Vehicle Not Found
                </p>

                <button onClick={()=>navigate(-1)} className="mt-4 px-4 py-2 rounded-lg">Go Back</button>
            </div>

        )
    }

     const {
    vehicleName,
    owner,
    category,
    pricePerDay,
    location,
    availability,
    description,
    coverImage,
  } = vehicle;

    const handleBookNow = () => {
    
    console.log("Booking vehicle:", vehicle._id);
  };
 
  return(
    <div className="max-w-5xl mx-auto py-10 px-4 md:px-6 bg-slate-50">

        <button onClick={()=> navigate(-1)}
            className="mb-4 inline-flex items-center text-sm text-slate-600 hover:text-slate-700"> 
           <IoMdArrowRoundBack />  Back
        </button>

        <div className="grid md:grid-cols-2 gap-8 bg-white rounded-2xl shadow-sm ">

            <div className="relative h-64 md:h-full  overflow-hidden">

                <img src={coverImage} alt={vehicleName} 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300 rounded-2xl"/>

            </div>

            <div className="p-6 space-y-4">
          <div className="flex items-center justify-between gap-3">
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
              {vehicleName}
            </h1>
            <span
              className={`px-3 py-1 text-xs font-semibold rounded-full text-white ${
                availability === "Available" ? "bg-emerald-500" : "bg-rose-500"
              }`}
            >
              {availability}
            </span>
          </div>
         <p className="text-sm text-slate-600">
            <span className="font-semibold text-slate-800">Owner:</span>{" "}
            {owner || "N/A"}
          </p>

          <div className="text-sm text-slate-600 space-y-1">
            <p>
              <span className="font-semibold text-slate-800">Category:</span>{" "}
              {category}
            </p>
            <p>
              <span className="font-semibold text-slate-800">Location:</span>{" "}
              {location}
            </p>
            <p>
              <span className="font-semibold text-slate-800">Price:</span>{" "}
              ${pricePerDay} / day
            </p>
          </div>

          <div>
            <h2 className="text-base font-semibold text-slate-900 mb-1">
              Description
            </h2>
            <p className="text-sm text-slate-700">{description}</p>
          </div>

          <button
            onClick={handleBookNow}
            className="mt-4 inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-red-600 text-white text-sm font-semibold hover:bg-red-700 transition-colors"
          >
            Book Now
          </button>
        </div>
      </div>


       <div className='relative h-[90vh] w-full overflow-hidden mt-10 rounded-2xl'>
           
            <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover brightness-75 rounded-2xl" src="/cardetails.page.mp4"></video>

      <div className="absolute inset-0 bg-black/40" />
            <div className="text-white relative z-10 flex flex-col items-center justify-center text-center h-full">
                <h1 className="text-3xl md:text-6xl font-bold drop-shadow-xl">Top-Rated Vehicle Booking Platform In Country</h1>

                <p className="mt-4 text-lg md:text-2xl drop-shadow-lg">Customer Approved. Traveler Trusted.
                </p>

                <div className='mt-8 flex gap-4'>
                    <NavLink to="/All-Vehicles" className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg" >
                    Explore Vehicles</NavLink>

                   
                </div>




            </div>
        </div>
      
    </div>
  );
};
    
export default VehicleDetails;