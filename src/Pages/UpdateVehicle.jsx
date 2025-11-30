import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import api from "../api/axios";
import toast from "react-hot-toast";
import { useAuth } from "../Providers/AuthProvider";

const UpdateVehicles = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    vehicleName: "",
    owner: "",
    category: "",
    pricePerDay: "",
    location: "",
    availability: "Available",
    coverImage: "",
    description: "",
  });

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState("");

  // 🔹 Fetch existing vehicle data
  useEffect(() => {
    setLoading(true);
    setError("");

    api
      .get(`/vehicles/${id}`)
      .then((res) => {
        const v = res.data;

        setFormData({
          vehicleName: v.vehicleName || "",
          owner: v.owner || user?.displayName || "",
          category: v.category || "",
          pricePerDay: v.pricePerDay || "",
          location: v.location || "",
          availability: v.availability || "Available",
          coverImage: v.coverImage || "",
          description: v.description || "",
        });
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load vehicle data.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id, user?.displayName]);

  // 🔹 Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "pricePerDay" ? Number(value) : value,
    }));
  };

  // 🔹 Handle update submit
  const handleSubmit = (e) => {
    e.preventDefault();
    setUpdating(true);
    setError("");

    api
      .put(`/vehicles/${id}`, formData)
      .then((res) => {
        toast.success("Vehicle updated successfully");
        navigate("/My-Vehicles"); // go back to My Vehicles
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to update vehicle.");
        toast.error("Failed to update vehicle");
      })
      .finally(() => {
        setUpdating(false);
      });
  };

  // 🔹 Loading / error states
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
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
        Update Vehicle
      </h1>
      <p className="text-sm text-slate-600 mb-6">
        Modify the details of your vehicle and save the changes.
      </p>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white rounded-2xl shadow-sm border border-slate-100 p-6"
      >
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Vehicle Name
            </label>
            <input
              type="text"
              name="vehicleName"
              required
              value={formData.vehicleName}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-red-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Owner Name
            </label>
            <input
              type="text"
              name="owner"
              required
              value={formData.owner}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-red-600"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Category
            </label>
            <select
              name="category"
              required
              value={formData.category}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-red-600"
            >
              <option value="">Select category</option>
              <option value="Sedan">Sedan</option>
              <option value="SUV">SUV</option>
              <option value="Electric">Electric</option>
              <option value="Van">Van</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Price Per Day (USD)
            </label>
            <input
              type="number"
              name="pricePerDay"
              required
              min="0"
              value={formData.pricePerDay}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-red-600"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Location
            </label>
            <input
              type="text"
              name="location"
              required
              value={formData.location}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-red-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Availability
            </label>
            <select
              name="availability"
              required
              value={formData.availability}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-red-600"
            >
              <option value="Available">Available</option>
              <option value="Booked">Booked</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Cover Image URL
          </label>
          <input
            type="text"
            name="coverImage"
            required
            value={formData.coverImage}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-red-600"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Description
          </label>
          <textarea
            name="description"
            rows="3"
            required
            value={formData.description}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-red-600"
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={updating}
          className="w-full mt-2 py-2.5 rounded-lg bg-red-700 text-white text-sm font-semibold hover:bg-red-800 disabled:bg-slate-400 disabled:cursor-not-allowed"
        >
          {updating ? "Updating..." : "Update Vehicle"}
        </button>
      </form>
    </div>
  );
};

export default UpdateVehicles;
