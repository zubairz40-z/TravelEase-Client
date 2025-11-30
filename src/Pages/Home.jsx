import React, { useEffect, useState } from "react";
import Banner from "../Components/Banner";
import api from "../api/axios";
import VehicleCard from "../Components/VehicleCard";
import { NavLink } from "react-router";

// ✅ new imports
import { format } from "date-fns";
import { motion } from "framer-motion";
import { useSpring, animated } from "@react-spring/web";

const Home = () => {
  const [latestVehicles, setLatestVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ✅ THEME STATE (Home only)
  const [theme, setTheme] = useState(
    () => localStorage.getItem("homeTheme") || "light"
  );
  const isDark = theme === "dark";

  useEffect(() => {
    localStorage.setItem("homeTheme", theme);
  }, [theme]);

  // ✅ date-fns: formatted date
  const today = new Date();
  const formattedDate = format(today, "EEEE, dd MMMM yyyy");

  // ✅ React Spring: smooth bg + text color transition for the whole page
  const bgSpring = useSpring({
    backgroundColor: isDark ? "#020617" : "#f8fafc", // dark vs light bg
    color: isDark ? "#e5e7eb" : "#0f172a", // base text color
    config: { tension: 210, friction: 25 },
  });

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
  ];

  useEffect(() => {
    setLoading(true);
    setError("");

    api
      .get("/vehicles")
      .then((res) => {
        const all = res.data || [];

        const sorted = [...all].sort(
          (a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
        );

        const topSix = sorted.slice(0, 6);
        setLatestVehicles(topSix);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load vehicles.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <animated.div style={bgSpring} className="min-h-screen ">
      {/* Banner section */}
      <Banner />

       <div className="max-w-6xl mx-auto px-4 md:px-6 mt-10 flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-red-500 font-semibold">
              TravelEase
            </p>
            <p
              className={`text-sm mt-1 ${
                isDark ? "text-slate-300" : "text-slate-700"
              }`}
            >
              Today is {formattedDate}
            </p>
          </div>

          {/* Theme Toggle Switch */}
          <motion.button
            onClick={toggleTheme}
            className="relative flex items-center w-20 h-9 rounded-full border border-slate-300 bg-white shadow-sm px-1"
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className="absolute inset-y-1 w-8 rounded-full bg-red-500"
              animate={{ x: isDark ? 38 : 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
            />
            <span className="relative flex-1 text-[11px] font-semibold text-center">
              ☀️
            </span>
            <span className="relative flex-1 text-[11px] font-semibold text-center">
              🌙
            </span>
          </motion.button>
        </div>

      <div className="max-w-6xl mx-auto space-y-12 py-10 px-4 md:px-6">
        {/* Recently Added Vehicles */}
        <section className="space-y-4 px-4">
          <div>
            <h2
              className={`text-xl md:text-2xl font-bold ${
                isDark ? "text-slate-50" : "text-slate-900"
              }`}
            >
              Recently Added Vehicles
            </h2>

            <p
              className={`text-sm ${
                isDark ? "text-slate-300" : "text-slate-600"
              }`}
            >
              Explore the latest vehicles added by trusted owners.
            </p>
          </div>

          {loading && (
            <p className="text-sm italic">
              Loading latest vehicles, please wait...
            </p>
          )}
          {error && <p className="text-sm text-red-500">{error}</p>}

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {latestVehicles.map((vehicle) => (
              <VehicleCard key={vehicle._id} vehicle={vehicle} />
            ))}
          </div>
        </section>
        

        {/* Top Categories */}
        <section className="space-y-4 px-4 md:px-8 lg:px-12">
          <div>
            <h2
              className={`text-xl md:text-2xl font-bold ${
                isDark ? "text-slate-50" : "text-slate-900"
              }`}
            >
              Top Categories
            </h2>
            <p
              className={`text-sm ${
                isDark ? "text-slate-300" : "text-slate-600"
              }`}
            >
              Pick the perfect type of vehicle for your next trip.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((cat) => (
              <motion.div
                key={cat.name}
                whileHover={{ y: -4, scale: 1.02 }} // ✅ framer-motion use
                className="rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow border border-slate-200"
              >
                <NavLink to="/All-Vehicles">
                  <div className="h-24 md:h-32 overflow-hidden">
                    <img
                      src={cat.img}
                      alt={cat.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  <div className="p-3 text-center">
                    <h3 className="font-semibold text-slate-900">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-slate-600">
                      Explore the best {cat.name.toLowerCase()} options
                    </p>
                  </div>
                </NavLink>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Video / Hero section */}
        <div className="relative h-[90vh] w-full overflow-hidden mt-10 rounded-2xl">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover brightness-75 "
            src="/happycustomers.mp4"
          ></video>

          <div className="absolute inset-0 bg-black/40" />
          <div className="text-white relative z-10 flex flex-col items-center justify-center text-center h-full">
            <h1 className="text-3xl md:text-6xl font-bold drop-shadow-xl">
              Top-Rated Vehicle Booking Platform In Country
            </h1>

            <p className="mt-4 text-lg md:text-2xl drop-shadow-lg">
              Customer Approved. Traveler Trusted.
            </p>

            <div className="mt-8 flex gap-4">
              <NavLink
                to="/All-Vehicles"
                className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg"
              >
                Explore Vehicles
              </NavLink>
            </div>
          </div>
        </div>

        {/* ✅ Info + Theme Toggle AFTER VIDEO */}
       

        {/* Text/Info section */}
        <section className="space-y-3 px-4 md:px-8 lg:px-12">
          <div className="py-16 p-2 bg-white rounded-2xl shadow-sm">
            <div className="m-auto text-gray-600 md:px-8">
              <div className="space-y-6 md:space-y-0 md:flex md:gap-6 lg:items-center lg:gap-12">
                <div className="md:w-5/12 lg:w-5/12">
                  <img
                    src="https://plus.unsplash.com/premium_photo-1661775632324-d4d95c0e0099?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cmVudCUyMGElMjBjYXJ8ZW58MHx8MHx8fDA%3D"
                    alt="image"
                    loading="lazy"
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>
                <div className="md:7/12 lg:w-6/12">
                  <h2 className="text-2xl text-gray-900 font-bold md:text-4xl">
                    TravelEase – Your Smart Vehicle Booking & Trip Management
                    Partner
                  </h2>
                  <p className="mt-6 text-gray-600">
                    TravelEase makes renting vehicles simpler, faster, and more
                    reliable. Whether you're planning a long trip, a weekend
                    getaway, or daily commuting, we connect you with trusted
                    vehicle owners across the country. Explore, compare, and
                    book your preferred car with ease.
                  </p>
                  <p className="mt-4 text-gray-600">
                    Our platform is designed to give users full control — manage
                    bookings, track trips, update vehicle details, and enjoy
                    transparent pricing. TravelEase ensures a smooth experience
                    for both renters and vehicle owners with secure payments and
                    a clean, modern interface.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </animated.div>
  );
};

export default Home;
