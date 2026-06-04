import React, { useState } from "react";
import { Phone, CalendarDays, Users } from "lucide-react";

export default function EventBooking() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    eventType: "",
    guests: "",
    date: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    alert("Event Booking Request Submitted Successfully!");

    setFormData({
      name: "",
      phone: "",
      email: "",
      eventType: "",
      guests: "",
      date: "",
      message: "",
    });
  };

  return (
    <section
      className="relative min-h-screen py-16 px-4 bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2000&auto=format&fit=crop')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/85"></div>

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-10">
          <p className="uppercase tracking-[8px] text-red-500 text-sm mb-4">
            Celebrate With Raj Restaurant
          </p>

          <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight">
            Celebrate In
            <span className="block text-yellow-400">
              Royal Style
            </span>
          </h1>

          <p className="text-red-400 mt-4 text-lg font-medium">
            Weddings • Birthdays • Corporate Events • Engagements
          </p>

          <p className="text-gray-300 mt-5 max-w-2xl mx-auto">
            Let us make your celebration unforgettable with premium dining,
            elegant decorations and exceptional hospitality.
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-black/70 backdrop-blur-xl border border-yellow-500/20 rounded-3xl p-6 md:p-8 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                className="bg-black border border-zinc-700 rounded-xl px-4 h-12 text-white focus:border-yellow-500 focus:outline-none"
                required
              />

              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                className="bg-black border border-zinc-700 rounded-xl px-4 h-12 text-white focus:border-yellow-500 focus:outline-none"
                required
              />

              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                className="bg-black border border-zinc-700 rounded-xl px-4 h-12 text-white focus:border-yellow-500 focus:outline-none"
                required
              />

              <select
                name="eventType"
                value={formData.eventType}
                onChange={handleChange}
                className="bg-black border border-zinc-700 rounded-xl px-4 h-12 text-white focus:border-yellow-500 focus:outline-none"
                required
              >
                <option value="">Select Event Type</option>
                <option>Birthday Party</option>
                <option>Anniversary</option>
                <option>Corporate Event</option>
                <option>Wedding Function</option>
                <option>Engagement Ceremony</option>
                <option>Family Gathering</option>
              </select>

              <input
                type="number"
                name="guests"
                placeholder="Expected Guests"
                value={formData.guests}
                onChange={handleChange}
                className="bg-black border border-zinc-700 rounded-xl px-4 h-12 text-white focus:border-yellow-500 focus:outline-none"
              />

              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="bg-black border border-zinc-700 rounded-xl px-4 h-12 text-white focus:border-yellow-500 focus:outline-none"
              />
            </div>

            <textarea
              rows="3"
              name="message"
              placeholder="Special Requirements..."
              value={formData.message}
              onChange={handleChange}
              className="w-full bg-black border border-zinc-700 rounded-xl px-4 py-3 text-white focus:border-yellow-500 focus:outline-none resize-none"
            />

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 transition py-3 rounded-xl text-black font-bold shadow-lg"
            >
              Submit Event Request
            </button>
          </form>

          {/* Contact */}
          <div className="grid md:grid-cols-3 gap-6 mt-8 text-center">
            <div>
              <Phone className="mx-auto text-yellow-400 mb-2" />
              <p className="text-white font-semibold">
                +91 98765 43210
              </p>
            </div>

            <div>
              <CalendarDays className="mx-auto text-yellow-400 mb-2" />
              <p className="text-white font-semibold">
                10 AM - 11 PM
              </p>
            </div>

            <div>
              <Users className="mx-auto text-yellow-400 mb-2" />
              <p className="text-white font-semibold">
                Raj Restaurant, Bhopal
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}