import React, { useEffect, useState, useRef } from "react";
import api from "../api/axios";
import toast from "react-hot-toast";
import { scroller } from "react-scroll";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Theme colors
const theme = {
  primary: "#ef4444", // red
  secondary: "#3b82f6", // blue
  success: "#10b981", // green
};

// Built-in VehicleCard
const VehicleCard = ({ vehicle, selected }) => {
  const [currentImage, setCurrentImage] = useState(0);

  if (!vehicle) return null;

  const { vehicleName, category, pricePerDay, location, availability, coverImage } = vehicle;

  const handlePrev = (e) => {
    e.stopPropagation();
    setCurrentImage((prev) => (prev - 1 + coverImage.length) % coverImage.length);
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setCurrentImage((prev) => (prev + 1) % coverImage.length);
  };

  return (
    <div
      className={`bg-white rounded-2xl shadow-sm transition-transform duration-300 overflow-hidden hover:shadow-lg ${
        selected ? "ring-2 ring-red-400 scale-105" : ""
      }`}
    >
      {/* Image */}
      <div className="relative aspect-video overflow-hidden">
        {coverImage && coverImage.length > 0 && (
          <img
            src={coverImage[currentImage]}
            alt={vehicleName}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        )}

        {/* Availability */}
        <span
          className={`absolute top-2 left-2 px-2 py-1 text-xs font-medium rounded-full text-white ${
            availability === "Available" ? "bg-emerald-500" : "bg-rose-500"
          }`}
        >
          {availability}
        </span>

        {/* Prev/Next */}
        {coverImage && coverImage.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/40 text-white p-1 rounded-full hover:bg-black/60 transition"
            >
              &#10094;
            </button>
            <button
              onClick={handleNext}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/40 text-white p-1 rounded-full hover:bg-black/60 transition"
            >
              &#10095;
            </button>
          </>
        )}
      </div>

      {/* Details */}
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="text-lg font-semibold text-slate-900 mb-2">{vehicleName}</h3>
        <div className="mb-3 space-y-1 text-sm text-slate-700">
          <p>
            <span className="font-semibold text-slate-800">Category:</span> {category}
          </p>
          <p>
            <span className="font-semibold text-slate-800">Location:</span> {location}
          </p>
          <p>
            <span className="font-semibold text-slate-800">Price:</span> ${pricePerDay}/day
          </p>
        </div>
        {selected && (
          <span className="mt-auto inline-block px-3 py-1 text-xs font-medium text-white bg-red-600 rounded-full text-center">
            Selected
          </span>
        )}
      </div>
    </div>
  );
};

const Compare = () => {
  const [vehicles, setVehicles] = useState([]);
  const [selected, setSelected] = useState([]);
  const [loading, setLoading] = useState(true);

  const comparisonRef = useRef(null);

  // Fetch vehicles
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
    let newSelected;
    if (selected.some((v) => v._id === vehicle._id)) {
      newSelected = selected.filter((v) => v._id !== vehicle._id);
      setSelected(newSelected);
    } else if (selected.length < 3) {
      newSelected = [...selected, vehicle];
      setSelected(newSelected);

      // Scroll to comparison every time a new vehicle is selected
      setTimeout(() => {
        scroller.scrollTo("comparison-section", {
          duration: 700,
          smooth: true,
          offset: -80,
        });
      }, 200);
    } else {
      toast.error("You can compare up to 3 vehicles");
      return;
    }
  };

  const chartData = selected.map((v) => ({
    name: v.vehicleName,
    Price: v.pricePerDay,
    Rating: v.rating,
    Features: v.features ? Object.values(v.features).filter(Boolean).length : 0,
  }));

  if (loading)
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="h-10 w-10 rounded-full border-4 border-red-600 border-t-transparent animate-spin" />
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 space-y-12">
      {/* Intro */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">
          Select Cars to Compare
        </h1>
        <p className="text-slate-600">
          Click on up to 3 vehicles below to see a detailed comparison.
        </p>
      </div>

      {/* Vehicles Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {vehicles.map((v) => (
          <div
            key={v._id}
            className={`cursor-pointer transform transition-all hover:-translate-y-1 hover:shadow-xl rounded-2xl border ${
              selected.some((s) => s._id === v._id)
                ? "border-[3px] ring-2 ring-red-400 shadow-lg"
                : "border-slate-200/70 shadow-sm"
            }`}
            onClick={() => toggleSelect(v)}
          >
            <VehicleCard vehicle={v} selected={selected.some((s) => s._id === v._id)} />
          </div>
        ))}
      </div>

      {/* Comparison Section */}
      {selected.length > 0 && (
        <div ref={comparisonRef} name="comparison-section" className="space-y-8">
          {/* Chart */}
          <div className="bg-white p-6 rounded-2xl shadow-lg overflow-x-auto">
            <h2 className="text-xl font-semibold mb-4 text-slate-800">
              Vehicle Ranking Chart
            </h2>
            <div style={{ minWidth: selected.length * 200 }}>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart
                  data={chartData}
                  margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
                  barCategoryGap="20%"
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="Price" fill={theme.primary} />
                  <Bar dataKey="Rating" fill={theme.secondary} />
                  <Bar dataKey="Features" fill={theme.success} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="text-sm text-slate-500 mt-2">
              Comparison based on Price, Rating, and number of Features.
            </p>
          </div>

          {/* Table */}
          {selected.length > 1 && (
            <div className="overflow-x-auto bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-4 text-slate-800">
                Comparison Table
              </h2>
              <table className="w-full table-auto border-collapse border border-slate-200">
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
                  {[
                    ["Category", "category"],
                    ["Price / Day", "pricePerDay"],
                    ["Transmission", "transmission"],
                    ["Fuel Type", "fuelType"],
                    ["Seats", "seats"],
                    ["Mileage", "mileage"],
                    ["Rating", "rating"],
                    ["Features", "features"],
                  ].map(([label, key], idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                      <td className="border px-4 py-2 font-medium">{label}</td>
                      {selected.map((v) => (
                        <td key={v._id} className="border px-4 py-2 text-center text-sm">
                          {key === "features"
                            ? v.features &&
                              Object.keys(v.features)
                                .filter((f) => v.features[f])
                                .map((f) => f.charAt(0).toUpperCase() + f.slice(1))
                                .join(", ")
                            : key === "rating"
                            ? `${v[key]} ⭐ (${v.reviewsCount})`
                            : v[key]}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Compare;
