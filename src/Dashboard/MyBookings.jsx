import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { useAuth } from "../Providers/AuthProvider";
import toast from "react-hot-toast";

const MyBookings = () => {
  const { user } = useAuth();

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch bookings
  useEffect(() => {
    if (!user?.email) return;

    setLoading(true);
    setError("");

    api
      .get(`/my-bookings?email=${user.email}`)
      .then((res) => setBookings(res.data || []))
      .catch((err) => {
        console.error(err);
        setError("Failed to load your bookings.");
      })
      .finally(() => setLoading(false));
  }, [user?.email]);

  // Cancel booking
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

  // Not logged in
  if (!user?.email) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center mt-10">
        <p className="text-sm text-slate-700">
          Please log in to see your bookings.
        </p>
      </div>
    );
  }

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
        <p className="text-sm text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 ">
      <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
        My Bookings
      </h1>
      <p className="text-sm text-slate-600 mb-1">
        All the vehicles you have booked will be shown here.
      </p>
      <p className="text-xs text-slate-500 mb-4">
        Showing bookings for:{" "}
        <span className="font-medium">{user.email}</span>
      </p>

      {bookings.length === 0 ? (
        <p className="text-sm text-slate-500 mt-4">
          You don’t have any bookings yet.
        </p>
      ) : (
        <div className="mt-4 grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
          {bookings.map((b) => (
            <div
              key={b._id}
              className="border border-slate-200 rounded-lg p-4 flex items-center gap-4 bg-white shadow-sm"
            >
              {/* Vehicle Image */}
              {b.coverImage && (
                <img
                  src={
                    Array.isArray(b.coverImage)
                      ? b.coverImage[0]
                      : b.coverImage
                  }
                  alt={b.vehicleName || "Vehicle"}
                  className="h-20 w-28 object-cover rounded-md border"
                />
              )}

              {/* Booking Info */}
              <div className="flex-1 flex flex-col justify-between">
                <p className="font-semibold text-slate-900">
                  {b.vehicleName || "Vehicle"}
                </p>

                <p className="text-xs text-slate-500">
                  Location: {b.location || "N/A"} • Price: $
                  {b.pricePerDay || 0} / day
                </p>

                {b.startDate && b.endDate && (
                  <p className="text-[11px] text-slate-400 mt-1">
                    {new Date(b.startDate).toLocaleDateString()} →{" "}
                    {new Date(b.endDate).toLocaleDateString()}
                  </p>
                )}
              </div>

              {/* Cancel Button */}
              <button
                onClick={() => handleCancel(b._id)}
                className="text-xs px-3 py-1.5 rounded bg-red-600 text-white hover:bg-red-700"
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
