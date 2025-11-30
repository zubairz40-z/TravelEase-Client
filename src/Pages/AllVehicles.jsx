import React, { useEffect, useMemo, useState } from "react";
import api from "../api/axios";

import VehicleCard from "../Components/VehicleCard";
import { NavLink } from 'react-router';

const AllVehicles =()=>{


     const [vehicles, setVehicles] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


    const [selectedCategory,setSelectedCategory]=useState("All");
    const [sortOption,setSortOption]=useState("latest");

    
  useEffect(() => {
    setLoading(true);
    setError("");

    api
      .get("/vehicles")
      .then((res) => {
        setVehicles(res.data || []);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load vehicles. Please try again.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  const categories = useMemo(() => {
    const set = new Set();
    vehicles.forEach((v) => {
      if (v.category) set.add(v.category);
    });
    return ["All", ...Array.from(set)];
  }, [vehicles]);

const filteredAndSortedVehicles = useMemo(() => {
    let list = vehicles;
    
    if (selectedCategory !== "All") {
      list = list.filter((v) => v.category === selectedCategory);
    }

    
    const sorted = [...list];

    if (sortOption === "priceLowHigh") {
      sorted.sort(
        (a, b) => (a.pricePerDay || 0) - (b.pricePerDay || 0)
      );
    } else if (sortOption === "priceHighLow") {
      sorted.sort(
        (a, b) => (b.pricePerDay || 0) - (a.pricePerDay || 0)
      );
    } else if (sortOption === "latest") {
      
      sorted.sort(
        (a, b) =>
          new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
      );
    }
   
    return sorted;
  }, [vehicles, selectedCategory, sortOption]);

  // 🔹 Loading state
  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="h-10 w-10 rounded-full border-4 border-red-600 border-t-transparent animate-spin" />
      </div>
    );
  }

  // 🔹 Error state
  if (error) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-red-600 text-sm">{error}</p>
      </div>
    );
  }



    
    return(
        <div className="max-w-6xl mx-auto space-y-6 py-10 px-4 md:px-6">


            <header className="space-y-2">
                <h1 className="text-2xl md:text-3xl font-bold text-slate-900">All Vehicles</h1>

                <p className="text-sm text-slate-800">Browse all available vehicles.You can filter by category or sort by price</p>
            </header>

            <div className="flex flex-col md:flex-row gap-3 md:items-center md:justify-between bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
     

        <div className="flex items-center gap-2">
          <label className="text-sm text-slate-700 font-medium">Category:</label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="border border-slate-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-sm text-slate-700 font-medium">Sort By:</label>
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="border border-slate-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="default">Default</option>
            <option value="latest">Latest</option>
            <option value="priceLowHigh">Price: Low to High</option>
            <option value="priceHighLow">Price: High to Low</option>
          </select>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredAndSortedVehicles.length === 0 ? (
          <p className="text-sm text-slate-600 col-span-full">
            No vehicles found for this filter.
          </p>
        ) : (
           filteredAndSortedVehicles.map((vehicle) => (
            <VehicleCard key={vehicle._id} vehicle={vehicle} />
          ))
        )}
      </div>
        </div>
    
    )
}

export default AllVehicles;