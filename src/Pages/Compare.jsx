import React, { useEffect, useState } from "react";
import api from "../api/axios";
import toast from "react-hot-toast";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const Compare = () => {
  const [vehicles, setVehicles] = useState([]);
  const [selected, setSelected] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all public vehicles
  useEffect(() => {
    setLoading(true);
    api
      .get("/vehicles")
      .then((res) => setVehicles(res.data || []))
      .catch((err) => {
        console.error(err);
        toast.error("Failed to load vehicles");
      })
      .finally(() => setLoading(false));
  }, []);

  const toggleSelect = (vehicle) => {
    if (selected.includes(vehicle)) {
      setSelected(selected.filter((v) => v._id !== vehicle._id));
    } else if (selected.length < 3) {
      setSelected([...selected, vehicle]);
    } else {
      toast.error("You can compare up to 3 vehicles");
    }
  };

  // Prepare chart data
  const chartData = selected.map((v) => ({
    name: v.vehicleName,
    Price: v.pricePerDay,
    Rating: v.rating,
    Features: v.features ? Object.values(v.features).filter(Boolean).length : 0,
  }));

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="h-10 w-10 rounded-full border-4 border-red-600 border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      <h1 className="text-3xl font-bold text-slate-900 mb-6 text-center">
        Compare Vehicles
      </h1>

      {/* Vehicle Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        {vehicles.map((v) => (
          <div
            key={v._id}
            className={`border rounded-lg shadow hover:shadow-lg transition p-4 cursor-pointer ${
              selected.includes(v) ? "border-red-600 ring-2 ring-red-400" : ""
            }`}
            onClick={() => toggleSelect(v)}
          >
            <img
              src={Array.isArray(v.coverImage) ? v.coverImage[0] : v.coverImage}
              alt={v.vehicleName}
              className="h-40 w-full object-cover rounded-md mb-4"
            />
            <h2 className="text-lg font-semibold text-slate-800 mb-1">
              {v.vehicleName}
            </h2>
            <p className="text-sm text-slate-500 mb-2">{v.category}</p>
            <p className="text-sm text-red-600 font-bold">${v.pricePerDay} / day</p>
          </div>
        ))}
      </div>

      {/* Ranking Chart */}
      {selected.length > 0 && (
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4 text-slate-800">
            Vehicle Ranking Chart
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={chartData}
              margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Price" fill="#f87171" />
              <Bar dataKey="Rating" fill="#60a5fa" />
              <Bar dataKey="Features" fill="#34d399" />
            </BarChart>
          </ResponsiveContainer>
          <p className="text-sm text-slate-500 mt-2">
            Price, Rating, and number of Features are compared here.
          </p>
        </div>
      )}

      {/* Comparison Table */}
      {selected.length > 1 && (
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse border border-slate-200 mt-8">
            <thead>
              <tr className="bg-slate-100">
                <th className="border px-4 py-2 text-left">Feature</th>
                {selected.map((v) => (
                  <th key={v._id} className="border px-4 py-2 text-center">
                    {v.vehicleName}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white">
                <td className="border px-4 py-2 font-medium">Category</td>
                {selected.map((v) => (
                  <td key={v._id} className="border px-4 py-2 text-center">
                    {v.category}
                  </td>
                ))}
              </tr>

              <tr className="bg-slate-50">
                <td className="border px-4 py-2 font-medium">Price / Day</td>
                {selected.map((v) => (
                  <td key={v._id} className="border px-4 py-2 text-center">
                    ${v.pricePerDay}
                  </td>
                ))}
              </tr>

              <tr className="bg-white">
                <td className="border px-4 py-2 font-medium">Transmission</td>
                {selected.map((v) => (
                  <td key={v._id} className="border px-4 py-2 text-center">
                    {v.transmission}
                  </td>
                ))}
              </tr>

              <tr className="bg-slate-50">
                <td className="border px-4 py-2 font-medium">Fuel Type</td>
                {selected.map((v) => (
                  <td key={v._id} className="border px-4 py-2 text-center">
                    {v.fuelType}
                  </td>
                ))}
              </tr>

              <tr className="bg-white">
                <td className="border px-4 py-2 font-medium">Seats</td>
                {selected.map((v) => (
                  <td key={v._id} className="border px-4 py-2 text-center">
                    {v.seats}
                  </td>
                ))}
              </tr>

              <tr className="bg-slate-50">
                <td className="border px-4 py-2 font-medium">Mileage</td>
                {selected.map((v) => (
                  <td key={v._id} className="border px-4 py-2 text-center">
                    {v.mileage}
                  </td>
                ))}
              </tr>

              <tr className="bg-white">
                <td className="border px-4 py-2 font-medium">Rating</td>
                {selected.map((v) => (
                  <td key={v._id} className="border px-4 py-2 text-center">
                    {v.rating} ⭐ ({v.reviewsCount})
                  </td>
                ))}
              </tr>

              <tr className="bg-slate-50">
                <td className="border px-4 py-2 font-medium">Features</td>
                {selected.map((v) => (
                  <td key={v._id} className="border px-4 py-2 text-center text-xs">
                    {v.features &&
                      Object.keys(v.features)
                        .filter((f) => v.features[f])
                        .map((f) => f.charAt(0).toUpperCase() + f.slice(1))
                        .join(", ")}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Compare;
