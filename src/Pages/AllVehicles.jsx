import React, { useEffect, useMemo, useState } from "react";
import api from "../api/axios";
import VehicleCard from "../Components/VehicleCard";

const AllVehicles = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Filters & Search
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOption, setSortOption] = useState("latest");
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState([0, 1000]); // min-max price filter

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  // Fetch all vehicles
  useEffect(() => {
    setLoading(true);
    setError("");

    api
      .get("/vehicles")
      .then((res) => setVehicles(res.data || []))
      .catch((err) => {
        console.error(err);
        setError("Failed to load vehicles. Please try again.");
      })
      .finally(() => setLoading(false));
  }, []);

  // Categories
  const categories = useMemo(() => {
    const set = new Set();
    vehicles.forEach((v) => v.category && set.add(v.category));
    return ["All", ...Array.from(set)];
  }, [vehicles]);

  // Filter, search, sort
  const filteredAndSortedVehicles = useMemo(() => {
    let list = [...vehicles];

    // Category filter
    if (selectedCategory !== "All") {
      list = list.filter((v) => v.category === selectedCategory);
    }

    // Price filter
    list = list.filter(
      (v) =>
        (v.pricePerDay || 0) >= priceRange[0] &&
        (v.pricePerDay || 0) <= priceRange[1]
    );

    // Search by name or location
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      list = list.filter(
        (v) =>
          v.vehicleName.toLowerCase().includes(query) ||
          (v.location || "").toLowerCase().includes(query)
      );
    }

    // Sorting
    if (sortOption === "priceLowHigh") {
      list.sort((a, b) => (a.pricePerDay || 0) - (b.pricePerDay || 0));
    } else if (sortOption === "priceHighLow") {
      list.sort((a, b) => (b.pricePerDay || 0) - (a.pricePerDay || 0));
    } else if (sortOption === "latest") {
      list.sort(
        (a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
      );
    } else if (sortOption === "rating") {
      list.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }

    return list;
  }, [vehicles, selectedCategory, sortOption, searchQuery, priceRange]);

  // Pagination logic
  const totalPages = Math.ceil(filteredAndSortedVehicles.length / itemsPerPage);
  const paginatedVehicles = filteredAndSortedVehicles.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Loading state
  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="h-10 w-10 rounded-full border-4 border-red-600 border-t-transparent animate-spin" />
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-red-600 text-sm">{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6 py-10 px-4 md:px-6">
      <header className="space-y-2">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
          Explore Vehicles
        </h1>
        <p className="text-sm text-slate-800">
          Browse all available vehicles. Use filters, sorting, or search.
        </p>
      </header>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-3 md:items-center md:justify-between bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
        {/* Search */}
        <input
          type="text"
          placeholder="Search by name or location..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border border-slate-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 flex-1"
        />

        {/* Category filter */}
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

        {/* Sort */}
        <div className="flex items-center gap-2">
          <label className="text-sm text-slate-700 font-medium">Sort By:</label>
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="border border-slate-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="latest">Latest</option>
            <option value="priceLowHigh">Price: Low to High</option>
            <option value="priceHighLow">Price: High to Low</option>
            <option value="rating">Rating</option>
          </select>
        </div>
      </div>

      {/* Vehicles grid */}
      {paginatedVehicles.length === 0 ? (
        <p className="text-sm text-slate-600 mt-4">
          No vehicles found for this filter.
        </p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {paginatedVehicles.map((vehicle) => (
            <VehicleCard key={vehicle._id} vehicle={vehicle} />
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-6">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 rounded bg-slate-200 hover:bg-slate-300 disabled:opacity-50"
          >
            Prev
          </button>
          <span className="text-sm text-slate-700">
            {currentPage} / {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 rounded bg-slate-200 hover:bg-slate-300 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default AllVehicles;
