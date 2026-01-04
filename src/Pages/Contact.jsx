import React, { useState } from "react";
import toast from "react-hot-toast";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Message sent successfully!");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="space-y-16 flex flex-col">

      {/* Hero / Top Section */}
      <div className="relative h-[50vh] w-full overflow-hidden rounded-2xl">
        <video
          src="/cardetails.page.mp4"
          alt="Contact"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover brightness-75"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 flex flex-col items-center justify-center text-center h-full px-4">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white drop-shadow-xl">
            Get in Touch with Us
          </h1>
          <p className="mt-4 text-lg md:text-2xl text-white drop-shadow-lg max-w-3xl">
            Have questions, suggestions, or need support? We're here to help 24/7.
          </p>
        </div>
      </div>

      {/* Contact Form + Info Section */}
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Contact Form */}
          <form
            onSubmit={handleSubmit}
            className="flex-1 bg-white p-10 rounded-2xl shadow-lg space-y-6"
          >
            <h2 className="text-3xl font-bold text-slate-900 text-center">
              Contact Us
            </h2>
            <p className="text-slate-600 text-center">
              Fill out the form below and we will get back to you as soon as possible.
            </p>

            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />

            <textarea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              rows={6}
              className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />

            <div className="text-center">
              <button
                type="submit"
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-medium shadow-lg transition"
              >
                Send Message
              </button>
            </div>
          </form>

          {/* Contact Info */}
          <div className="flex-1 bg-red-50 p-10 rounded-2xl shadow-lg space-y-6 flex flex-col justify-center">
            <h3 className="text-3xl font-semibold text-slate-900 text-center">
              Other Ways to Reach Us
            </h3>
            <p className="text-slate-700 text-center">
              Email: <span className="font-medium">zubairsupport@travelease.com</span>
            </p>
            <p className="text-slate-700 text-center">
              Phone: <span className="font-medium">+880 1234 567 890</span>
            </p>
            <p className="text-slate-700 text-center">
              Address: <span className="font-medium">Travel St, Dhaka, Bangladesh</span>
            </p>
            <p className="text-slate-600 text-center mt-6">
              We're here to assist you anytime, whether it's questions, suggestions, or support.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
