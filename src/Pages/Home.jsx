
import React from "react";
import Banner from "../Components/Banner";
import { fakeVehicles } from './../Components/fakeVehicles';
import VehicleCard from "../Components/VehicleCard";
import { NavLink } from 'react-router';

const Home =()=>{
    const sortedByDate =[...fakeVehicles].sort((a,b)=>new Date(b.createdAt) -new Date(a.createdAt))

    const latestVehicles =sortedByDate.slice(0,6)

    const categories = [
       {
  name: "Sedan",
  img: "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2VkYW58ZW58MHx8MHx8fDA%3D",
},
{
  name: "SUV",
  img: "https://www.gmccanada.ca/content/dam/gmc/na/ca/en/index/crossovers-suvs/suvs-segment-page/suv-segment/my26-terrain-gmc-suv-page-exterior-1920x960-26PGTN94087.jpg?imwidth=1200",
},
{
  name: "Electric",
  img: "https://www.topgear.com/sites/default/files/2023/12/1%20BYD%20Seal%20review.JPG",
},
{
  name: "Van",
  img: "https://imgcdnused.carbay.com/PH/car_image/52025/1749883721967.jpeg",
},
    ]

    return(
        <div className=" bg-slate-50">
        
        
        <Banner></Banner>

        <div className="max-w-6xl mx-auto space-y-12 py-10 px-4 md:px-6">

        <section className="space-y-4 px-4">
            <div >

                <h2 className="text-xl md:text-2xl font-bold text-slate-900">Recently Added Vehicles</h2>

                <p className="text-sm text-slate-600">Explore the latest Vehicles added by trusted owners.</p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {latestVehicles.map((vehicle)=>(
                    <VehicleCard key={vehicle._id} vehicle={vehicle}></VehicleCard>

                ))}
            </div>
        </section>
<section className="space-y-4 px-4 md:px-8 lg:px-12">
  <div>
    <h2 className="text-xl md:text-2xl font-bold text-slate-900">
      Top Categories
    </h2>
    <p className="text-sm text-slate-600">
      Pick the perfect type of vehicle for your next trip.
    </p>
  </div>

  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
    {categories.map((cat) => (
      <div
        key={cat.name}
        className="rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow border border-slate-200"
      >
        {/* Category Image */}
        <div className="h-24 md:h-32 overflow-hidden">
          <img
            src={cat.img}
            alt={cat.name}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Category Text */}
        <div className="p-3 text-center">
          <h3 className="font-semibold text-slate-900">{cat.name}</h3>
          <p className="text-xs text-slate-600">
            Explore the best {cat.name.toLowerCase()} options
          </p>
        </div>
      </div>
    ))}
  </div>
</section>

      <div className='relative h-[90vh] w-full overflow-hidden mt-10 rounded-2xl '>
           
            <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover brightness-75 " src="/happycustomers.mp4"></video>

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

        

      <section className="space-y-3 px-4 md:px-8 lg:px-12">
        <div className="py-16 p-2 bg-white rounded-2xl shadow-sm">  
  <div class=" m-auto  text-gray-600 md:px-8 ">
      <div className="space-y-6 md:space-y-0 md:flex md:gap-6 lg:items-center lg:gap-12">
        <div className="md:w-5/12 lg:w-5/12">
          <img src="https://plus.unsplash.com/premium_photo-1661775632324-d4d95c0e0099?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cmVudCUyMGElMjBjYXJ8ZW58MHx8MHx8fDA%3D" alt="image" loading="lazy" width="" height="" className="w-full h-full object-cover rounded-xl"/>
        </div>
        <div className="md:7/12 lg:w-6/12">
          <h2 className="text-2xl text-gray-900 font-bold md:text-4xl">   TravelEase – Your Smart Vehicle Booking & Trip Management Partner</h2>
          <p className="mt-6 text-gray-600">TravelEase makes renting vehicles simpler, faster, and more reliable. Whether you're planning a long
    trip, a weekend getaway, or daily commuting, we connect you with trusted vehicle owners across the
    country. Explore, compare, and book your preferred car with ease.</p>
          <p className="mt-4 text-gray-600"> Our platform is designed to give users full control — manage bookings, track trips, update vehicle
    details, and enjoy transparent pricing. TravelEase ensures a smooth experience for both renters and
    vehicle owners with secure payments and a clean, modern interface.</p>
        </div>
      </div>
  </div>
</div>
      </section>
        </div>

        

    </div>    
    )
}

export default Home;