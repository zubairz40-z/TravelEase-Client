import React from 'react';
import { Link } from 'react-router';
import { NavLink } from 'react-router';
 


 const Banner =()=>{
    return(
        <div className='relative h-[100vh] w-full overflow-hidden'>
           
            <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover brightness-75" src="/car-banner-vid.mp4"></video>

      <div className="absolute inset-0 bg-black/40" />
            <div className="text-white relative z-10 flex flex-col items-center justify-center text-center h-full">
                <h1 className="text-4xl md:text-6xl font-bold drop-shadow-xl">TravelEase-Find Your Perfect Ride</h1>

                <p className="mt-4 text-lg md:text-2xl drop-shadow-lg">Fast . Affordable . Comfortable</p>

                <div className='mt-8 flex gap-4'>
                    <NavLink to="/All-Vehicles" className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg" >
                    Explore Vehicles</NavLink>

                    <NavLink to="/Add-Vehicles" className=" px-6 py-3 bg-white hover:bg-gray-200 text-black rounded-lg text-lg font-semibold shadow-lg">
                        Add Your Vehicle
                    </NavLink>
                </div>




            </div>
        </div>
      
    )
 }

 export default Banner;