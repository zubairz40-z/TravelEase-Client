import React from "react";
import { NavLink } from "react-router";

const About = () => {
  const closeMenu = () => {};

  return (
    <div className="space-y-16">

      

      {/* About Content */}
      <div className="max-w-7xl mx-auto px-4 space-y-16 p-20">

        {/* Introduction */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-slate-900">About Travelease</h1>
          <p className="text-slate-600 max-w-3xl mx-auto text-lg md:text-xl">
            Travelease is a modern car booking and rental platform designed to make your travel smooth and stress-free. 
            Whether you need a car for a weekend getaway, a business trip, or a long-term journey, Travelease offers 
            a wide selection of reliable vehicles, transparent pricing, and seamless booking experience.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
         {/* Hero / Video Section */}
      <div className="relative h-[70vh] w-full overflow-hidden rounded-2xl">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover brightness-75"
          src="/happycustomers.mp4"
        />

        <div className="absolute inset-0 bg-black/40" />

        <div className="text-white relative z-10 flex flex-col items-center justify-center text-center h-full px-4">
          {/* Logo Section */}
          <div className="absolute top-6 left-6 flex items-center gap-3">
            <NavLink to="/" onClick={closeMenu}>
              <img src="/sport-car.png" alt="Logo" className="w-12 h-12" />
            </NavLink>
            <NavLink to="/" onClick={closeMenu}>
              <h2 className="text-2xl font-bold text-white">TravelEase</h2>
            </NavLink>
          </div>

          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold drop-shadow-xl">
            Your Trusted Car Booking & Rental Platform
          </h1>
          <p className="mt-4 text-lg md:text-2xl lg:text-2xl drop-shadow-lg max-w-3xl">
            Easy, reliable, and affordable vehicles for every journey – whether it’s a short trip or a long adventure.
          </p>

          <div className="mt-8 flex gap-4">
            <NavLink
              to="/All-Vehicles"
              className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold shadow-lg transition"
            >
              Explore Vehicles
            </NavLink>
          </div>
        </div>
      </div>
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-slate-900">Our Mission</h2>
            <p className="text-slate-700 text-lg">
              To make vehicle booking simple, safe, and accessible for everyone. Travelease empowers travelers with flexible options, 
              transparent pricing, and reliable service for every journey.
            </p>

            <h2 className="text-2xl font-semibold text-slate-900">Our Vision</h2>
            <p className="text-slate-700 text-lg">
              We envision a world where every journey is stress-free and enjoyable. 
              Leveraging technology, Travelease ensures you get the right vehicle at the right time, every time.
            </p>
          </div>
        </div>

        {/* Core Values */}
        <div className="text-center space-y-12">
          <h2 className="text-3xl font-bold text-slate-900">Why Choose Travelease?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition">
              <h3 className="text-xl font-semibold mb-2 text-slate-900">Reliable Vehicles</h3>
              <p className="text-slate-700 text-lg">
                Each vehicle is thoroughly inspected to ensure safety, comfort, and performance for every trip.
              </p>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition">
              <h3 className="text-xl font-semibold mb-2 text-slate-900">Affordable Pricing</h3>
              <p className="text-slate-700 text-lg">
                Transparent and competitive rates so you can travel without worrying about hidden costs.
              </p>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition">
              <h3 className="text-xl font-semibold mb-2 text-slate-900">24/7 Customer Support</h3>
              <p className="text-slate-700 text-lg">
                Our dedicated support team is ready to assist you anytime, ensuring smooth and worry-free travels.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default About;
