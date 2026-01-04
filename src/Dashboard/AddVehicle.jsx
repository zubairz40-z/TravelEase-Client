import React, { useState } from "react";
import api from "../api/axios";
import { useAuth } from "../Providers/AuthProvider";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

const AddVehicle = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [imageUrls, setImageUrls] = useState([""]);

  const handleAddVehicle = (e) => {
    e.preventDefault();
    if (!user?.email) {
      toast.error("You must be logged in to add a vehicle.");
      return;
    }

    const form = e.target;
    const newVehicle = {
      vehicleName: form.vehicleName.value,
      owner: form.owner.value,
      category: form.category.value,
      pricePerDay: parseFloat(form.pricePerDay.value),
      location: form.location.value,
      availability: form.availability.value,
      description: form.description.value,
      userEmail: user.email,
      createdAt: new Date().toISOString(),
      transmission: form.transmission.value,
      fuelType: form.fuelType.value,
      mileage: form.mileage.value,
      seats: parseInt(form.seats.value),
      images: imageUrls.filter((url) => url.trim() !== ""), // remove empty URLs
    };

    setLoading(true);

    api
      .post("/vehicles", newVehicle)
      .then(() => {
        toast.success("Vehicle added successfully");
        form.reset();
        setImageUrls([""]);
        navigate("/My-Vehicles");
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to add vehicle");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleImageChange = (index, value) => {
    const newImages = [...imageUrls];
    newImages[index] = value;
    setImageUrls(newImages);
  };

  const addImageField = () => setImageUrls([...imageUrls, ""]);
  const removeImageField = (index) =>
    setImageUrls(imageUrls.filter((_, i) => i !== index));

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 pt-10">
      <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
        Add a Vehicle
      </h1>
      <p className="text-sm text-slate-600 mb-6">
        Fill in the details of the vehicle you want to list for rent.
      </p>

      {!user && (
        <p className="text-sm text-red-600 mb-4">
          You must be logged in to add a vehicle.
        </p>
      )}

      <form
        onSubmit={handleAddVehicle}
        className="space-y-4 bg-white rounded-2xl shadow-sm border border-slate-100 p-6"
      >
        {/* Vehicle Name & Owner */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Vehicle Name
            </label>
            <input
              type="text"
              name="vehicleName"
              required
              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-red-600"
              placeholder="Toyota Corolla"
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
              defaultValue={user?.displayName || ""}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-red-600"
              placeholder="Your Name"
            />
          </div>
        </div>

        {/* Category & Price */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Category
            </label>
            <select
              name="category"
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
              required
              min="0"
              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-red-600"
              placeholder="70"
            />
          </div>
        </div>

        {/* Location & Availability */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Location
            </label>
            <input
              type="text"
              name="location"
              required
              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-red-600"
              placeholder="Dhaka, Bangladesh"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Availability
            </label>
            <select
              name="availability"
              required
              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-red-600"
            >
              <option value="Available">Available</option>
              <option value="Booked">Booked</option>
            </select>
          </div>
        </div>

        {/* Extra Specs */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Transmission
            </label>
            <select
              name="transmission"
              required
              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-red-600"
            >
              <option value="">Select Transmission</option>
              <option value="Automatic">Automatic</option>
              <option value="Manual">Manual</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Fuel Type
            </label>
            <select
              name="fuelType"
              required
              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-red-600"
            >
              <option value="">Select Fuel</option>
              <option value="Petrol">Petrol</option>
              <option value="Diesel">Diesel</option>
              <option value="Electric">Electric</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </div>
        </div>

        {/* Mileage & Seats */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Mileage (km/l)
            </label>
            <input
              type="number"
              name="mileage"
              required
              min="0"
              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-red-600"
              placeholder="15"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Seats
            </label>
            <input
              type="number"
              name="seats"
              required
              min="1"
              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-red-600"
              placeholder="5"
            />
          </div>
        </div>

        {/* Multiple Images */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Images URLs
          </label>
          {imageUrls.map((url, index) => (
            <div key={index} className="flex items-center gap-2 mb-2">
              <input
                type="text"
                value={url}
                onChange={(e) => handleImageChange(index, e.target.value)}
                placeholder="https://..."
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-red-600"
              />
              {index > 0 && (
                <button
                  type="button"
                  onClick={() => removeImageField(index)}
                  className="px-2 py-1 text-white bg-red-600 rounded-lg hover:bg-red-700"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addImageField}
            className="mt-1 px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Add Another Image
          </button>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Description
          </label>
          <textarea
            name="description"
            rows="3"
            required
            className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-red-600"
            placeholder="Comfortable 5-seater with A/C and GPS."
          ></textarea>
        </div>

        {/* User Email */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Your Email (owner)
          </label>
          <input
            type="email"
            name="userEmail"
            value={user?.email || ""}
            readOnly
            className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm bg-slate-100"
          />
          <p className="text-[11px] text-slate-500 mt-1">
            This email will be stored as the owner of this vehicle.
          </p>
        </div>

        <button
          type="submit"
          disabled={!user || loading}
          className="w-full mt-2 py-2.5 rounded-lg bg-red-700 text-white text-sm font-semibold hover:bg-red-800 disabled:bg-slate-400 disabled:cursor-not-allowed"
        >
          {loading ? "Adding..." : "Add Vehicle"}
        </button>
      </form>
    </div>
  );
};

export default AddVehicle;
