import React, { useState } from "react";
import api from "../api/axios";
import { useAuth } from "../Providers/AuthProvider";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

const AddVehicle = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [coverImage, setCoverImage] = useState([""]);

  const [features, setFeatures] = useState({
    airConditioning: false,
    bluetooth: false,
    gps: false,
    backupCamera: false,
    cruiseControl: false,
    sunroof: false,
  });

  const handleFeatureChange = (e) => {
    const { name, checked } = e.target;
    setFeatures((prev) => ({ ...prev, [name]: checked }));
  };

  const handleImageChange = (index, value) => {
    const updated = [...coverImage];
    updated[index] = value;
    setCoverImage(updated);
  };

  const addImageField = () => setCoverImage([...coverImage, ""]);
  const removeImageField = (index) =>
    setCoverImage(coverImage.filter((_, i) => i !== index));

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user?.email) {
      toast.error("Login required");
      return;
    }

    const form = e.target;

    const newVehicle = {
      vehicleName: form.vehicleName.value,
      owner: form.owner.value,
      category: form.category.value,
      pricePerDay: Number(form.pricePerDay.value),
      location: form.location.value,
      availability: form.availability.value,
      description: form.description.value,
      transmission: form.transmission.value,
      fuelType: form.fuelType.value,
      mileage: `${form.mileage.value} km/l`,
      seats: Number(form.seats.value),
      coverImage: coverImage.filter(Boolean),
      features,
      rating: 0,
      reviewsCount: 0,
      userEmail: user.email,
      createdAt: new Date(),
    };

    try {
      setLoading(true);
      await api.post("/vehicles", newVehicle);
      toast.success("Vehicle added successfully");
      navigate("/my-vehicles");
    } catch (err) {
      console.error(err);
      toast.error("Failed to add vehicle");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-2">Add Vehicle</h1>
      <p className="text-slate-600 mb-6">
        List your vehicle for rent on TravelEase
      </p>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow space-y-5"
      >
        {/* Name & Owner */}
        <div className="grid md:grid-cols-2 gap-4">
          <input name="vehicleName" required placeholder="Vehicle Name" className="input" />
          <input name="owner" defaultValue={user?.displayName || ""} required placeholder="Owner Name" className="input" />
        </div>

        {/* Category & Price */}
        <div className="grid md:grid-cols-2 gap-4">
          <select name="category" required className="input">
            <option value="">Select Category</option>
            <option>Sedan</option>
            <option>SUV</option>
            <option>Sports</option>
            <option>Electric</option>
            <option>Van</option>
          </select>
          <input name="pricePerDay" type="number" required placeholder="Price per day" className="input" />
        </div>

        {/* Location & Availability */}
        <div className="grid md:grid-cols-2 gap-4">
          <input name="location" required placeholder="Location" className="input" />
          <select name="availability" className="input">
            <option>Available</option>
            <option>Pending</option>
            <option>Booked</option>
          </select>
        </div>

        {/* Specs */}
        <div className="grid md:grid-cols-3 gap-4">
          <select name="transmission" required className="input">
            <option value="">Transmission</option>
            <option>Automatic</option>
            <option>Manual</option>
          </select>
          <select name="fuelType" required className="input">
            <option value="">Fuel</option>
            <option>Petrol</option>
            <option>Diesel</option>
            <option>Electric</option>
            <option>Hybrid</option>
          </select>
          <input name="seats" type="number" min="1" required placeholder="Seats" className="input" />
        </div>

        <input name="mileage" required placeholder="Mileage (e.g. 10)" className="input" />

        {/* Images */}
        <div>
          <label className="font-medium">Cover Images</label>
          {coverImage.map((img, i) => (
            <div key={i} className="flex gap-2 mt-2">
              <input
                value={img}
                onChange={(e) => handleImageChange(i, e.target.value)}
                placeholder="Image URL"
                className="input flex-1"
              />
              {i > 0 && (
                <button type="button" onClick={() => removeImageField(i)} className="btn-red">
                  Remove
                </button>
              )}
            </div>
          ))}
          <button type="button" onClick={addImageField} className="btn-green mt-2">
            Add Image
          </button>
        </div>

        {/* Features */}
        <div>
          <label className="font-medium mb-2 block">Features</label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {Object.keys(features).map((feature) => (
              <label key={feature} className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  name={feature}
                  checked={features[feature]}
                  onChange={handleFeatureChange}
                />
                {feature.replace(/([A-Z])/g, " $1")}
              </label>
            ))}
          </div>
        </div>

        {/* Description */}
        <textarea
          name="description"
          required
          rows="4"
          placeholder="Vehicle description"
          className="input"
        />

        <button
          disabled={loading}
          className="w-full bg-red-700 hover:bg-red-800 text-white py-3 rounded-lg font-semibold"
        >
          {loading ? "Adding..." : "Add Vehicle"}
        </button>
      </form>
    </div>
  );
};

export default AddVehicle;
