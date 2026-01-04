import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { useAuth } from "../Providers/AuthProvider";
import toast from "react-hot-toast";
import { updateProfile } from "firebase/auth";

const Register = () => {
  const [error, setError] = useState("");
  const { createUser, googleLogin, setUser } = useAuth();
  const navigate = useNavigate();

  // Demo credentials
  const demoUser = { email: "user@example.com", password: "user123" };
  const demoAdmin = { email: "admin@example.com", password: "admin123" };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const form = e.target;
    const name = form.username.value;
    const email = form.email.value;
    const photoURL = form.photo.value;
    const password = form.password.value;

    // Password validation
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }
    if (!/[A-Z]/.test(password)) {
      setError("Password must contain at least one uppercase letter.");
      return;
    }
    if (!/[a-z]/.test(password)) {
      setError("Password must contain at least one lowercase letter.");
      return;
    }

    createUser(email, password)
      .then((result) => {
        const currentUser = result.user;
        return updateProfile(currentUser, {
          displayName: name,
          photoURL: photoURL,
        }).then(() => {
          setUser({ ...currentUser, displayName: name, photoURL: photoURL });
        });
      })
      .then(() => {
        toast.success("Registration successful");
        navigate("/"); // go to Home
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
        toast.error("Registration failed");
      });
  };

  const handleGoogleLogin = () => {
    googleLogin()
      .then(() => {
        toast.success("Logged in with Google");
        navigate("/");
      })
      .catch((err) => {
        console.error(err);
        toast.error("Google login failed");
      });
  };

  const handleDemoLogin = (type) => {
    const creds = type === "user" ? demoUser : demoAdmin;
    createUser(creds.email, creds.password)
      .then(() => {
        toast.success(`Demo ${type} created`);
        navigate("/");
      })
      .catch((err) => {
        console.error(err);
        toast.error("Demo login failed");
      });
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center px-4 bg-gray-50 gap-10 md:gap-16 p-10">

      {/* Left side: Register Form */}
      <div className="w-full md:w-1/2 max-w-md p-8 space-y-6 rounded-2xl bg-white shadow-lg border border-gray-200">
        <h1 className="text-3xl font-bold text-center text-gray-800">Register</h1>

        {error && (
          <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1 text-sm">
            <label htmlFor="username" className="block text-gray-700">Username</label>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Username"
              className="w-full px-4 py-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-red-600 focus:outline-none"
              required
            />
          </div>

          <div className="space-y-1 text-sm">
            <label htmlFor="email" className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              placeholder="email@example.com"
              className="w-full px-4 py-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-red-600 focus:outline-none"
              required
            />
          </div>

          <div className="space-y-1 text-sm">
            <label htmlFor="photo" className="block text-gray-700">Photo URL</label>
            <input
              type="text"
              name="photo"
              placeholder="https://example.com/photo.jpg"
              className="w-full px-4 py-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-red-600 focus:outline-none"
              required
            />
          </div>

          <div className="space-y-1 text-sm">
            <label htmlFor="password" className="block text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              placeholder="At least 6 characters"
              className="w-full px-4 py-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-red-600 focus:outline-none"
              required
            />
            <p className="text-[11px] text-gray-500">
              Must be at least 6 characters, include 1 uppercase and 1 lowercase letter.
            </p>
          </div>

          <button
            type="submit"
            className="w-full p-3 text-center rounded-md bg-red-600 text-white font-semibold hover:bg-red-700 transition"
          >
            Register
          </button>
        </form>

        {/* Demo login */}
        <div className="flex justify-center gap-4 mt-2">
          <button
            onClick={() => handleDemoLogin("user")}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-sm"
          >
            Demo User
          </button>
          
        </div>

        {/* Social login */}
        <div className="flex items-center pt-4 space-x-1">
          <div className="flex-1 h-px bg-gray-300"></div>
          <p className="px-3 text-sm text-gray-500">Register with Google</p>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>
        <div className="flex justify-center mt-2">
          <button
            onClick={handleGoogleLogin}
            aria-label="Register with Google"
            className="p-3 rounded-md bg-gray-100 hover:bg-gray-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-5 h-5 fill-current">
              <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"/>
            </svg>
          </button>
        </div>

        <p className="text-xs text-center mt-4 text-gray-500">
          Already have an account?{" "}
          <NavLink to="/Login" className="underline text-red-600">Log In</NavLink>
        </p>
      </div>

      {/* Right side: Video */}
      <div className="relative w-full md:w-1/2 h-[600px] rounded-2xl overflow-hidden shadow-lg hidden md:block">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover brightness-75"
          src="/happycustomers.mp4"
        />
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 flex flex-col justify-center h-full text-white px-6">
          <h1 className="text-3xl md:text-5xl font-bold drop-shadow-xl mb-4">
            Join Our Platform!
          </h1>
          <p className="text-lg md:text-2xl drop-shadow-lg mb-6">
            Register securely to manage bookings and explore vehicles anytime.
          </p>
          <ul className="list-disc list-inside text-sm md:text-base mb-6">
            <li>Create and manage your account</li>
            <li>Fast, secure registration</li>
            <li>Explore top-rated vehicles</li>
          </ul>
          <NavLink
            to="/All-Vehicles"
            className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg w-max"
          >
            Explore Vehicles
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Register;
