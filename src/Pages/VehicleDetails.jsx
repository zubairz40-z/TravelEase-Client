import React, { useEffect, useState } from "react";
import { useParams, useNavigate, NavLink } from "react-router";
import api from "../api/axios";
import { format } from "date-fns";
import { useAuth } from "../Providers/AuthProvider";
import toast from "react-hot-toast";
import { IoMdArrowRoundBack } from "react-icons/io";

const VehicleDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [error, setError] = useState("");

  // booking dates
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");

    api
      .get(`/vehicles/${id}`)
      .then((res) => {
        setVehicle(res.data);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load vehicle details.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="h-10 w-10 rounded-full border-4 border-red-600 border-t-transparent animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-sm text-red-600">{error}</p>
      </div>
    );
  }

  if (!vehicle) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-sm text-slate-700">Vehicle not found.</p>
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
  } = vehicle;

  let formattedDate = "";
  if (createdAt) {
    try {
      formattedDate = format(new Date(createdAt), "dd MMM yyyy, hh:mm a");
    } catch {
      formattedDate = createdAt;
    }
  }

  // 🧠 BOOK NOW -> POST /bookings with dates
  const handleBookNow = () => {
    if (!user?.email) {
      toast.error("Please login to book this vehicle.");
      return;
    }

    if (availability === "Booked") {
      toast.error("This vehicle is already booked.");
      return;
    }

    if (!startDate || !endDate) {
      toast.error("Please select both start and end dates.");
      return;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      toast.error("Invalid date selected.");
      return;
    }

    if (end < start) {
      toast.error("End date cannot be before start date.");
      return;
    }

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
      .then(() => {
        toast.success("Booking request placed!");
        // optional: navigate("/MyBookings");
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to place booking.");
      })
      .finally(() => {
        setBookingLoading(false);
      });
  };

  return (
    <div className="max-w-5xl mx-auto py-10 px-4 md:px-6 bg-slate-100 m-15">
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-4 inline-flex items-center text-sm text-slate-600 hover:text-slate-700"
      >
        <IoMdArrowRoundBack className="mr-1" />
        Back
      </button>

      {/* Main card */}
      <div className="grid md:grid-cols-2 gap-8 bg-white rounded-2xl shadow-sm">
        {/* Image */}
        <div className="relative h-64 md:h-full overflow-hidden">
          <img
            src={coverImage}
            alt={vehicleName}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300 rounded-2xl"
          />
        </div>

        {/* Details */}
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between gap-3">
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
              {vehicleName}
            </h1>
            <span
              className={`px-3 py-1 text-xs font-semibold rounded-full text-white ${
                availability === "Available" ? "bg-emerald-500" : "bg-rose-500"
              }`}
            >
              {availability}
            </span>
          </div>

          <p className="text-sm text-slate-600">
            <span className="font-semibold text-slate-800">Owner:</span>{" "}
            {owner || "N/A"}
          </p>

          <div className="text-sm text-slate-600 space-y-1">
            <p>
              <span className="font-semibold text-slate-800">Category:</span>{" "}
              {category}
            </p>
            <p>
              <span className="font-semibold text-slate-800">Location:</span>{" "}
              {location}
            </p>
            <p>
              <span className="font-semibold text-slate-800">Price:</span> $
              {pricePerDay} / day
            </p>
            {formattedDate && (
              <p className="text-xs text-slate-400">Listed on: {formattedDate}</p>
            )}
          </div>

          {/* Booking dates */}
          <div className="grid md:grid-cols-2 gap-3 mt-3">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Start Date
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-red-600"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                End Date
              </label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-red-600"
              />
            </div>
          </div>

          <div>
            <h2 className="text-base font-semibold text-slate-900 mb-1">
              Description
            </h2>
            <p className="text-sm text-slate-700">{description}</p>
          </div>

          <button
            onClick={handleBookNow}
            disabled={bookingLoading}
            className="mt-4 inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-red-600 text-white text-sm font-semibold hover:bg-red-700 transition-colors disabled:bg-slate-400 disabled:cursor-not-allowed"
          >
            {bookingLoading ? "Booking..." : "Book Now"}
          </button>
        </div>
      </div>

      {/* Bottom promo section */}
      <div className="relative h-[90vh] w-full overflow-hidden mt-10 rounded-2xl">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover brightness-75 rounded-2xl"
          src="/cardetails.page.mp4"
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
    </div>
  );
};

export default VehicleDetails;
