import React, { useEffect, useState } from "react";
import { useAuth } from "../Providers/AuthProvider";
import { NavLink } from "react-router";
import api from "../api/axios";
import toast from "react-hot-toast";

const Profile = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch bookings and vehicles
  useEffect(() => {
    if (!user?.email) return;

    setLoading(true);

    Promise.all([
      api.get(`/my-bookings?email=${user.email}`),
      api.get(`/my-vehicles?email=${user.email}`)
    ])
      .then(([bookingsRes, vehiclesRes]) => {
        setBookings(bookingsRes.data || []);
        setVehicles(vehiclesRes.data || []);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to load profile data.");
      })
      .finally(() => setLoading(false));
  }, [user?.email]);

  if (!user?.email) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center mt-10">
        <p className="text-sm text-slate-700">
          Please log in to view your profile.
        </p>
      </div>
    );
  }

  // Calculate stats
  const totalBookings = bookings.length;
  const myVehicles = vehicles.length;
  const totalSpendUSD = bookings.reduce(
    (acc, b) => {
      // Calculate total spend per booking in USD
      // If you have startDate & endDate, use duration * pricePerDay
      const days =
        b.startDate && b.endDate
          ? Math.ceil(
              (new Date(b.endDate) - new Date(b.startDate)) / (1000 * 60 * 60 * 24)
            )
          : 1;
      return acc + (b.pricePerDay || 0) * days;
    },
    0
  );

  return (
    <div className="max-w-5xl mx-auto space-y-6">

      {/* PROFILE HEADER */}
      <div className="bg-white rounded-lg shadow p-6 flex items-center gap-6">
        <img
          src={user?.photoURL || "https://i.pravatar.cc/120"}
          alt="Profile"
          className="w-24 h-24 rounded-full border object-cover"
        />

        <div>
          <h2 className="text-2xl font-bold text-slate-800">
            {user?.displayName || "User"}
          </h2>
          <p className="text-slate-600">{user?.email}</p>
          <span className="inline-block mt-2 px-3 py-1 text-sm rounded-full bg-red-100 text-red-600">
            TravelEase Member
          </span>
        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-5 rounded-lg shadow text-center">
          <h3 className="text-sm text-slate-500">Total Bookings</h3>
          <p className="text-2xl font-bold text-red-600">{totalBookings}</p>
        </div>

        <div className="bg-white p-5 rounded-lg shadow text-center">
          <h3 className="text-sm text-slate-500">My Vehicles</h3>
          <p className="text-2xl font-bold text-red-600">{myVehicles}</p>
        </div>

        <div className="bg-white p-5 rounded-lg shadow text-center">
          <h3 className="text-sm text-slate-500">Total Spend</h3>
          <p className="text-2xl font-bold text-red-600">${totalSpendUSD}</p>
        </div>
      </div>

      {/* QUICK ACTIONS */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4 text-slate-800">
          Quick Actions
        </h3>

        <div className="flex flex-col sm:flex-row gap-4">
          <NavLink
            to="/dashboard/bookings"
            className="px-6 py-3 text-center rounded-md bg-red-600 text-white hover:bg-red-700 transition"
          >
            View My Bookings
          </NavLink>

          <NavLink
            to="/dashboard/my-vehicles"
            className="px-6 py-3 text-center rounded-md border border-red-600 text-red-600 hover:bg-red-50 transition"
          >
            View My Vehicles
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Profile;
