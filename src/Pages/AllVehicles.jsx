import React, { useMemo, useState } from "react";
import { fakeVehicles } from "../Components/fakeVehicles";
import { div } from "framer-motion/client";
import VehicleCard from "../Components/VehicleCard";

const AllVehicles =()=>{

    const [selectedCategory,setSelectedCategory]=useState("All");
    const [sortOption,setSortOption]=useState("default");

    const categories=["All",...new Set(fakeVehicles.map((v)=>v.category))]

    const filteredVehicles = useMemo(()=>{
        let data = [...fakeVehicles]

        if(selectedCategory != "All"){
            data=data.filter((v)=>v.category === selectedCategory)
        }

        if( sortOption === "priceLowHigh"){
            data.sort((a,b)=>a.pricePerDay-b.pricePerDay);
        }else if (sortOption === "priceHighLow") {
      data.sort((a, b) => b.pricePerDay - a.pricePerDay);
    } else if (sortOption === "latest") {
      data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    return data;
  }, [selectedCategory, sortOption]);


    return(
        <div className="max-w-6xl mx-auto space-y-6 py-8 px-4 md:px-6">
            <header className="space-y-2">
                <h1 className="text-2xl md:text-3xl font-bold text-slate-900">All Vehicles</h1>

                <p className="text-sm text-slate-800">Browse all available vehicles.You can filter by category and sort by price</p>
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
        {filteredVehicles.length === 0 ? (
          <p className="text-sm text-slate-600 col-span-full">
            No vehicles found for this filter.
          </p>
        ) : (
          filteredVehicles.map((vehicle) => (
            <VehicleCard key={vehicle._id} vehicle={vehicle} />
          ))
        )}
      </div>
        </div>
    
    )
}

export default AllVehicles;