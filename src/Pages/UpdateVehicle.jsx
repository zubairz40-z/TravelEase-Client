import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import api from "../api/axios";
import toast from "react-hot-toast";

const UpdateVehicles = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // 🔹 Fetch existing vehicle data
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
        setError("Failed to load vehicle data.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!vehicle) return;

    const form = e.target;

    const updatedVehicle = {
      vehicleName: form.vehicleName.value,
      owner: form.owner.value,
      category: form.category.value,
      pricePerDay: Number(form.pricePerDay.value),
      location: form.location.value,
      availability: form.availability.value,
      coverImage: form.coverImage.value,
      description: form.description.value,
      // userEmail stays same in DB (we don't overwrite it here)
    };

    setSaving(true);

    api
      .put(`/vehicles/${id}`, updatedVehicle)
      .then(() => {
        toast.success("Vehicle updated successfully");
        navigate("/My-Vehicles");
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to update vehicle");
      })
      .finally(() => {
        setSaving(false);
      });
  };

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
        <p className="text-sm text-red-600">
          {error || "Vehicle not found."}
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
        Update Vehicle
      </h1>
      <p className="text-sm text-slate-600 mb-6">
        Edit the details of your listed vehicle and save the changes.
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
              defaultValue={vehicle.vehicleName}
              required
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
              defaultValue={vehicle.owner}
              required
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
              defaultValue={vehicle.category}
              required
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
              defaultValue={vehicle.pricePerDay}
              required
              min="0"
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
              defaultValue={vehicle.location}
              required
              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-red-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Availability
            </label>
            <select
              name="availability"
              defaultValue={vehicle.availability}
              required
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
            defaultValue={vehicle.coverImage}
            required
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
            defaultValue={vehicle.description}
            required
            className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-red-600"
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="w-full mt-2 py-2.5 rounded-lg bg-red-700 text-white text-sm font-semibold hover:bg-red-800 disabled:bg-slate-400 disabled:cursor-not-allowed"
        >
          {saving ? "Updating..." : "Update Vehicle"}
        </button>
      </form>
    </div>
  );
};

export default UpdateVehicles;

