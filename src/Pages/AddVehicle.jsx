import React from "react";
import api from "../api/axios";
import { useAuth } from "../Providers/AuthProvider";
import toast from "react-hot-toast";

const AddVehicle = () => {
  const { user } = useAuth();
 const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const handleAddVehicle = (e) => {
    e.preventDefault();
    if (!user?.email) {
      toast.error("You must be logged in to add a vehicle.");
      return;
    }

    const form = e.target;
    const vehicleName = form.vehicleName.value;
    const owner = form.owner.value;
    const category = form.category.value;
    const pricePerDay = parseFloat(form.pricePerDay.value);
    const location = form.location.value;
    const availability = form.availability.value;
    const coverImage = form.coverImage.value;
    const description = form.description.value;
    const userEmail = user?.email;

    const newVehicle = {
      vehicleName,
      owner,
      category,
      pricePerDay: Number(pricePerDay),
      location,
      availability,
      coverImage,
      description,
      userEmail,
      createdAt: new Date().toISOString(),
    };

     setLoading(true);

    api
      .post("/vehicles", newVehicle)
      .then(() => {
        toast.success("Vehicle added successfully");
        form.reset();
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

   
  

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
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
              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-red-600"
              placeholder="Your Name"
              defaultValue={user?.displayName || ""}
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

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Cover Image URL
          </label>
          <input
            type="text"
            name="coverImage"
            required
            className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-red-600"
            placeholder="https://..."
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
            className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-red-600"
            placeholder="Comfortable 5-seater with A/C and GPS."
          ></textarea>
        </div>

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
          disabled={!user}
          className="w-full mt-2 py-2.5 rounded-lg bg-red-700 text-white text-sm font-semibold hover:bg-red-800 disabled:bg-slate-400 disabled:cursor-not-allowed"
        >
          Add Vehicle
        </button>
      </form>
    </div>
  );
};

export default AddVehicle;
