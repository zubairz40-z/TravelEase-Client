import React, { useEffect, useState } from "react";
import { useAuth } from "../Providers/AuthProvider";
import api from "../api/axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

const MyVehicles = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // 🔹 Fetch vehicles for logged-in user
  useEffect(() => {
    if (!user?.email) return;

    setLoading(true);
    setError("");

    api
      .get(`/my-vehicles?email=${user.email}`)
      .then((res) => {
        setVehicles(res.data || []);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load your vehicles.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [user?.email]);

  // 🔹 Delete vehicle
  const handleDelete = (id) => {
    const ok = window.confirm("Are you sure you want to delete this vehicle?");
    if (!ok) return;

    api
      .delete(`/vehicles/${id}`)
      .then(() => {
        setVehicles((prev) => prev.filter((v) => v._id !== id));
        toast.success("Vehicle deleted successfully");
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to delete vehicle");
      });
  };

  if (!user?.email) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-sm text-slate-700">
          Please log in to see your vehicles.
        </p>
      </div>
    );
  }

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

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 min-h-[80vh]">
      <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
        My Vehicles
      </h1>

      <p className="text-sm text-slate-600 mb-1">
        Vehicles listed using your account.
      </p>

      <p className="text-xs text-slate-500 mb-4">
        Currently logged in as:{" "}
        <span className="font-medium">{user.email}</span>
      </p>

      {vehicles.length === 0 ? (
        <div className="border border-dashed border-slate-300 rounded-xl p-6 text-sm text-slate-500">
          You haven’t added any vehicles yet.
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {vehicles.map((vehicle) => (
            <div
              key={vehicle._id}
              className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col"
            >
              {/* Image */}
              {vehicle.coverImage && (
                <div className="h-40 overflow-hidden">
                  <img
                    src={vehicle.coverImage}
                    alt={vehicle.vehicleName}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}

              {/* Info */}
              <div className="p-4 flex-1 flex flex-col gap-2">
                <div className="flex items-center justify-between gap-2">
                  <h2 className="font-semibold text-slate-900 text-sm md:text-base">
                    {vehicle.vehicleName}
                  </h2>
                  <span
                    className={`px-2 py-0.5 text-[11px] rounded-full text-white ${
                      vehicle.availability === "Available"
                        ? "bg-emerald-500"
                        : "bg-rose-500"
                    }`}
                  >
                    {vehicle.availability}
                  </span>
                </div>

                <p className="text-xs text-slate-600">
                  {vehicle.location || "Location not set"}
                </p>

                <p className="text-xs text-slate-700 font-medium">
                  ${vehicle.pricePerDay || 0} / day
                </p>

                <p className="text-[11px] text-slate-500 line-clamp-2">
                  {vehicle.description}
                </p>
              </div>

              {/* Actions */}
              <div className="px-4 pb-4 pt-2 flex gap-2 justify-between">
                <button
                  onClick={() => navigate(`/vehicles/${vehicle._id}`)}
                  className="flex-1 inline-flex items-center justify-center px-3 py-1.5 text-[11px] md:text-xs rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50"
                >
                  View Details
                </button>

                <button
                  onClick={() => navigate(`/update-vehicle/${vehicle._id}`)}
                  className="flex-1 inline-flex items-center justify-center px-3 py-1.5 text-[11px] md:text-xs rounded-lg bg-amber-500 text-white hover:bg-amber-600"
                >
                  Update
                </button>

                <button
                  onClick={() => handleDelete(vehicle._id)}
                  className="flex-1 inline-flex items-center justify-center px-3 py-1.5 text-[11px] md:text-xs rounded-lg bg-red-600 text-white hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyVehicles;
