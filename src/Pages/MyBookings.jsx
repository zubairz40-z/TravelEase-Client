import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { useAuth } from "../Providers/AuthProvider";
import toast from "react-hot-toast";

const MyBookings = () => {
  const { user } = useAuth();

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user?.email) return;

    setLoading(true);
    setError("");

    api
      .get(`/my-bookings?email=${user.email}`)
      .then((res) => {
        setBookings(res.data || []);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load your bookings.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [user?.email]);

  const handleCancel = (id) => {
    const ok = window.confirm("Cancel this booking?");
    if (!ok) return;

    api
      .delete(`/bookings/${id}`)
      .then(() => {
        setBookings((prev) => prev.filter((b) => b._id !== id));
        toast.success("Booking cancelled");
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to cancel booking");
      });
  };

  // 🌟 If user is not logged in
  if (!user?.email) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-sm text-slate-700">
          Please log in to see your bookings.
        </p>
      </div>
    );
  }

  // 🌟 Loading state
  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="h-10 w-10 rounded-full border-4 border-red-600 border-t-transparent animate-spin" />
      </div>
    );
  }

  // 🌟 Error state
  if (error) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-sm text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
        My Bookings
      </h1>
      <p className="text-sm text-red-600">
        All the vehicles you have booked will appear here.
      </p>

      <p className="text-xs text-slate-500 mb-4">
        Showing bookings for: <span className="font-medium">{user.email}</span>
      </p>

      {/* 🌟 Empty state */}
      {bookings.length === 0 ? (
        <p className="text-sm text-slate-600 mt-6">No bookings found.</p>
      ) : (
        <div className="grid gap-4 mt-6">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="p-4 border border-slate-200 rounded-xl bg-white shadow-sm flex justify-between items-center"
            >
              <div>
                <h3 className="font-semibold text-slate-900">
                  {booking.vehicleName}
                </h3>

                <p className="text-xs text-slate-600">
                  Location: {booking.location}
                </p>

                {/* 🌟 Show Date Range */}
                {booking.startDate && booking.endDate && (
                  <p className="text-xs text-slate-500 mt-1">
                    Trip:{" "}
                    {new Date(booking.startDate).toLocaleDateString()} →{" "}
                    {new Date(booking.endDate).toLocaleDateString()}
                  </p>
                )}

                {/* 🌟 Show booking created time */}
                <p className="text-[11px] text-slate-400 mt-1">
                  Booked on:{" "}
                  {new Date(booking.createdAt).toLocaleDateString()}
                </p>
              </div>

              <button
                onClick={() => handleCancel(booking._id)}
                className="px-3 py-1.5 text-xs bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Cancel
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookings;
