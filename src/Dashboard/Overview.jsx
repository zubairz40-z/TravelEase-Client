import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { useAuth } from "../Providers/AuthProvider";

const Overview = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch bookings for the logged-in user
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

  // Handle not logged in
  if (!user?.email) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center mt-10">
        <p className="text-sm text-slate-700">
          Please log in to see your dashboard.
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

  // Calculate overview stats
  const totalBookings = bookings.length;
  const activeRentals = bookings.filter((b) => b.availability === "Booked").length;
  const totalSpent = bookings.reduce(
    (acc, b) => acc + (b.pricePerDay || 0),
    0
  );

  return (
    <div className="space-y-6">

      {/* Overview Cards */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded shadow">
          <h4 className="text-sm text-slate-500">Total Bookings</h4>
          <p className="text-2xl font-bold text-slate-900">{totalBookings}</p>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h4 className="text-sm text-slate-500">Active Rentals</h4>
          <p className="text-2xl font-bold text-slate-900">{activeRentals}</p>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h4 className="text-sm text-slate-500">Total Spent</h4>
          <p className="text-2xl font-bold text-slate-900">${totalSpent}</p>
        </div>
      </div>

      {/* Chart Placeholder */}
      <div className="bg-white p-6 rounded shadow">
        <h4 className="font-semibold mb-2">Booking Activity</h4>
        <p className="text-sm text-slate-600">(Connect this to a chart for backend data)</p>
      </div>

      {/* Recent Bookings Table */}
      <div className="bg-white p-6 rounded shadow">
        <h4 className="font-semibold mb-2">Recent Bookings</h4>
        {bookings.length === 0 ? (
          <p className="text-sm text-slate-500">No bookings yet.</p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">Vehicle</th>
                <th className="text-left p-2">Start Date</th>
                <th className="text-left p-2">End Date</th>
                <th className="text-left p-2">Status</th>
                <th className="text-left p-2">Price/Day</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => (
                <tr key={b._id} className="border-b hover:bg-slate-50">
                  <td className="p-2 flex items-center gap-2">
                    {b.coverImage && (
                      <img
                        src={Array.isArray(b.coverImage) ? b.coverImage[0] : b.coverImage}
                        alt={b.vehicleName || "Vehicle"}
                        className="h-10 w-16 object-cover rounded border"
                      />
                    )}
                    <span>{b.vehicleName}</span>
                  </td>
                  <td className="p-2">{b.startDate ? new Date(b.startDate).toLocaleDateString() : "N/A"}</td>
                  <td className="p-2">{b.endDate ? new Date(b.endDate).toLocaleDateString() : "N/A"}</td>
                  <td className="p-2">{b.availability}</td>
                  <td className="p-2">${b.pricePerDay}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Overview;
