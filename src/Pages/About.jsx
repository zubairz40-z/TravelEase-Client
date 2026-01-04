import React from "react";

const About = () => (
  <div className="max-w-7xl mx-auto px-4 py-12 space-y-12">
    <div className="text-center space-y-4">
      <h1 className="text-4xl font-bold text-slate-900">About Travelease</h1>
      <p className="text-slate-600 max-w-2xl mx-auto">
        We make travel easy, safe, and fun by providing reliable vehicles and excellent support.
      </p>
    </div>
    <div className="grid md:grid-cols-2 gap-8 items-center">
      <img src="/images/about-hero.jpg" alt="Travel" className="rounded-2xl w-full object-cover h-80"/>
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-slate-900">Our Story</h2>
        <p className="text-slate-700">
          Travelease started to connect people with safe and affordable vehicles for their adventures.
        </p>
      </div>
    </div>
  </div>
);

export default About;
