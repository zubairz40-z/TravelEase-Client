import React, { useEffect, useState } from "react";
import { useParams, useNavigate, NavLink } from "react-router";
import api from "../api/axios";
import { format } from "date-fns";
import { useAuth } from "../Providers/AuthProvider";
import toast from "react-hot-toast";
import { IoMdArrowRoundBack } from "react-icons/io";
import { FaStar } from "react-icons/fa";

const VehicleDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [error, setError] = useState("");

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    setLoading(true);
    setError("");

    api
      .get(`/vehicles/${id}`)
      .then((res) => setVehicle(res.data))
      .catch(() => setError("Failed to load vehicle details."))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="h-10 w-10 rounded-full border-4 border-red-600 border-t-transparent animate-spin" />
      </div>
    );
  }

  if (error || !vehicle) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-red-600 text-sm">{error || "Vehicle not found."}</p>
      </div>
    );
  }

  const {
    _id,
    vehicleName,
    owner,
    category,
    pricePerDay,
    location,
    availability,
    description,
    coverImage,
    createdAt,
    rating,
    reviewsCount,
    transmission,
    fuelType,
    mileage,
    seats,
    features = {},
  } = vehicle;

  const formattedDate = createdAt
    ? format(new Date(createdAt), "dd MMM yyyy")
    : "";

  const handleBookNow = () => {
    if (!user?.email) return toast.error("Please login to book this vehicle.");
    if (availability !== "Available") return toast.error("This vehicle is already booked.");
    if (!startDate || !endDate) return toast.error("Select start and end dates.");

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (end < start) return toast.error("End date cannot be before start date.");

    const bookingData = {
      vehicleId: _id,
      vehicleName,
      owner,
      pricePerDay,
      location,
      coverImage,
      userEmail: user.email,
      userName: user.displayName || "",
      startDate,
      endDate,
      createdAt: new Date().toISOString(),
    };

    setBookingLoading(true);
    api
      .post("/bookings", bookingData)
      .then(() => toast.success("Booking request placed!"))
      .catch(() => toast.error("Failed to place booking."))
      .finally(() => setBookingLoading(false));
  };

  return (
    <div className="max-w-6xl mx-auto py-10 px-4 md:px-6 space-y-12">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center text-sm text-slate-600 hover:text-slate-700 mb-4"
      >
        <IoMdArrowRoundBack className="mr-1" />
        Back
      </button>

      {/* Vehicle Card */}
      <div className="grid md:grid-cols-2 gap-8 bg-white rounded-2xl shadow-md overflow-hidden">
        {/* Image Carousel */}
        <div className="relative h-80 md:h-[400px] w-full overflow-hidden rounded-l-2xl">
          {coverImage?.length > 0 && (
            <>
              <img
                src={coverImage[currentImageIndex]}
                alt={vehicleName}
                className="w-full h-full object-cover transition-transform duration-300"
              />
              {coverImage.length > 1 && (
                <>
                  <button
                    onClick={() =>
                      setCurrentImageIndex(
                        (prev) => (prev - 1 + coverImage.length) % coverImage.length
                      )
                    }
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full hover:bg-black/60 transition"
                  >
                    &#10094;
                  </button>
                  <button
                    onClick={() =>
                      setCurrentImageIndex((prev) => (prev + 1) % coverImage.length)
                    }
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full hover:bg-black/60 transition"
                  >
                    &#10095;
                  </button>
                </>
              )}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1">
                {coverImage.map((_, idx) => (
                  <span
                    key={idx}
                    className={`w-2 h-2 rounded-full ${
                      idx === currentImageIndex ? "bg-white" : "bg-gray-400"
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Details */}
        <div className="p-6 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between">
              <h1 className="text-2xl md:text-3xl font-bold text-slate-900">{vehicleName}</h1>
              <span
                className={`px-3 py-1 text-xs font-semibold rounded-full text-white ${
                  availability === "Available" ? "bg-emerald-500" : "bg-rose-500"
                }`}
              >
                {availability}
              </span>
            </div>
            <p className="text-sm text-slate-600 mt-1">
              <span className="font-semibold">Owner:</span> {owner}
            </p>
            <p className="text-sm text-slate-600">
              <span className="font-semibold">Category:</span> {category}
            </p>
            <p className="text-sm text-slate-600">
              <span className="font-semibold">Location:</span> {location}
            </p>
            <p className="text-sm text-slate-600">
              <span className="font-semibold">Price:</span> ${pricePerDay}/day
            </p>
            {formattedDate && (
              <p className="text-xs text-slate-400 mt-1">Listed on: {formattedDate}</p>
            )}

            {/* Key Specs */}
            <div className="mt-3">
              <h3 className="font-semibold text-slate-900 text-sm mb-1">Key Specs:</h3>
              <ul className="text-slate-700 text-sm space-y-1 list-disc list-inside">
                <li>Transmission: {transmission || "N/A"}</li>
                <li>Fuel Type: {fuelType || "N/A"}</li>
                <li>Mileage: {mileage || "N/A"}</li>
                <li>Seats: {seats || "N/A"}</li>
                {Object.keys(features).length > 0 && (
                  <li>
                    Features:{" "}
                    {Object.keys(features)
                      .filter((f) => features[f])
                      .join(", ")}
                  </li>
                )}
              </ul>
            </div>

            {/* Rating */}
            {rating && (
              <div className="flex items-center gap-2 mt-3">
                <span className="flex items-center gap-1 text-yellow-500">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={i < Math.round(rating) ? "fill-current" : "text-slate-300"}
                    />
                  ))}
                </span>
                <span className="text-sm text-slate-600">{rating} ({reviewsCount} reviews)</span>
              </div>
            )}
          </div>

          {/* Booking */}
          <div className="mt-4">
            <div className="grid md:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Start Date</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-red-600"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">End Date</label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-red-600"
                />
              </div>
            </div>
            <button
              onClick={handleBookNow}
              disabled={bookingLoading}
              className="mt-4 w-full px-5 py-2.5 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 transition disabled:bg-slate-400"
            >
              {bookingLoading ? "Booking..." : "Book Now"}
            </button>
          </div>

          {/* Description */}
          <div className="mt-4">
            <h2 className="text-base font-semibold text-slate-900 mb-1">Description</h2>
            <p className="text-sm text-slate-700">{description}</p>
          </div>
        </div>
      </div>

      {/* Promo Section */}
      <div className="relative h-[60vh] md:h-[70vh] w-full overflow-hidden rounded-2xl">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover brightness-75 rounded-2xl"
          src="/cardetails.page.mp4"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="text-white relative z-10 flex flex-col items-center justify-center text-center h-full px-4">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold drop-shadow-xl">
            Top-Rated Vehicle Booking Platform
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
    </div>
  );
};

export default VehicleDetails;
