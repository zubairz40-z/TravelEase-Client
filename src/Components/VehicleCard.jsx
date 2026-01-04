import React, { useState } from "react";
import { NavLink } from "react-router";

const VehicleCard = ({ vehicle }) => {
  if (!vehicle) return null;

  const {
    _id,
    vehicleName,
    category,
    pricePerDay,
    location,
    availability,
    coverImage, // now an array of images
  } = vehicle;

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handlePrevImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) =>
      (prev - 1 + coverImage.length) % coverImage.length
    );
  };

  const handleNextImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % coverImage.length);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/70 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden max-w-sm w-full mx-auto">
      {/* Image Section */}
      <div className="relative aspect-video overflow-hidden">
        {coverImage && coverImage.length > 0 && (
          <img
            src={coverImage[currentImageIndex]}
            alt={vehicleName}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        )}

        {/* Availability Badge */}
        <span
          className={`absolute top-2 left-2 px-2 py-1 text-xs font-medium rounded-full text-white ${
            availability === "Available" ? "bg-emerald-500" : "bg-rose-500"
          }`}
        >
          {availability}
        </span>

        {/* Prev/Next Buttons if multiple images */}
        {coverImage && coverImage.length > 1 && (
          <>
            <button
              onClick={handlePrevImage}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/40 text-white p-1 rounded-full hover:bg-black/60 transition"
            >
              &#10094;
            </button>
            <button
              onClick={handleNextImage}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/40 text-white p-1 rounded-full hover:bg-black/60 transition"
            >
              &#10095;
            </button>
          </>
        )}
      </div>

      {/* Details Section */}
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="text-lg font-semibold text-slate-900 mb-2">{vehicleName}</h3>

        <div className="mb-3 space-y-1 text-sm text-slate-700">
          <p>
            <span className="font-semibold text-slate-800">Category:</span>{" "}
            {category}
          </p>
          <p>
            <span className="font-semibold text-slate-800">Location:</span>{" "}
            {location}
          </p>
          <p>
            <span className="font-semibold text-slate-800">Price:</span> ${pricePerDay}/day
          </p>
        </div>

        {/* View Details Button */}
        <NavLink
          to={`/vehicles/${_id}`}
          className="mt-auto inline-flex items-center justify-center w-full px-3 py-2 rounded-lg bg-red-600 text-white text-sm font-medium hover:bg-red-700 transition-colors"
        >
          View Details
        </NavLink>
      </div>
    </div>
  );
};

export default VehicleCard;
