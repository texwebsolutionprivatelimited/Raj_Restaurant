import React, { useState } from "react";
import { Header } from "@/src/components/header";
import { BedDouble, CalendarDays, Users } from "lucide-react";

export default function RoomBookingPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    roomType: "",
    checkIn: "",
    checkOut: "",
    guests: "",
    request: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(
        "http://localhost:3000/api/room-bookings",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (res.ok) {
        alert("Room Booking Request Submitted Successfully!");

        setFormData({
          name: "",
          phone: "",
          email: "",
          roomType: "",
          checkIn: "",
          checkOut: "",
          guests: "",
          request: "",
        });
      }
    } catch (err) {
      console.error(err);
      alert("Failed to submit booking");
    }
  };

  return (
    <>
      <Header />

      <section
        className="min-h-screen pt-32 pb-20 px-4 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2000')",
        }}
      >
        <div className="absolute inset-0 bg-black/80"></div>

        <div className="relative z-10 max-w-5xl mx-auto">
          {/* Heading */}
          <div className="text-center mb-12">
            <p className="uppercase tracking-[8px] text-red-500 text-sm font-semibold mb-4">
              Luxury Stay
            </p>

            <h1 className="text-5xl md:text-7xl font-extrabold text-white">
              Book Your
              <span className="block text-red-500">
                Perfect Room
              </span>
            </h1>

            <p className="text-gray-300 mt-6 text-lg max-w-2xl mx-auto">
              Experience premium comfort, elegant interiors
              and exceptional hospitality at Raj Restaurant.
            </p>
          </div>

          {/* Form */}
          <div className="bg-black/70 backdrop-blur-xl border border-red-600/20 rounded-3xl p-8 md:p-10">
            <form onSubmit={handleSubmit}>
              <div className="grid md:grid-cols-2 gap-5">

                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="h-12 px-4 bg-zinc-900 border border-zinc-700 rounded-xl text-white"
                />

                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="h-12 px-4 bg-zinc-900 border border-zinc-700 rounded-xl text-white"
                />

                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="h-12 px-4 bg-zinc-900 border border-zinc-700 rounded-xl text-white"
                />

                <select
                  name="roomType"
                  value={formData.roomType}
                  onChange={handleChange}
                  required
                  className="h-12 px-4 bg-zinc-900 border border-zinc-700 rounded-xl text-white"
                >
                  <option value="">Select Room Type</option>
                  <option>Deluxe Room</option>
                  <option>Premium Suite</option>
                  <option>Royal Suite</option>
                </select>

                <input
                  type="date"
                  name="checkIn"
                  value={formData.checkIn}
                  onChange={handleChange}
                  className="h-12 px-4 bg-zinc-900 border border-zinc-700 rounded-xl text-white"
                />

                <input
                  type="date"
                  name="checkOut"
                  value={formData.checkOut}
                  onChange={handleChange}
                  className="h-12 px-4 bg-zinc-900 border border-zinc-700 rounded-xl text-white"
                />

                <input
                  type="number"
                  name="guests"
                  placeholder="Guests"
                  value={formData.guests}
                  onChange={handleChange}
                  className="h-12 px-4 bg-zinc-900 border border-zinc-700 rounded-xl text-white"
                />

              </div>

              <textarea
                rows="4"
                name="request"
                placeholder="Special Requests"
                value={formData.request}
                onChange={handleChange}
                className="w-full mt-5 p-4 bg-zinc-900 border border-zinc-700 rounded-xl text-white"
              />

              <button
                type="submit"
                className="w-full mt-6 bg-red-600 hover:bg-red-700 transition py-4 rounded-xl text-white font-bold"
              >
                Reserve Room
              </button>
            </form>

            {/* Amenities */}
            <div className="grid md:grid-cols-3 gap-6 mt-10">

              <div className="text-center">
                <BedDouble className="mx-auto text-red-500 mb-3" />
                <p className="text-white">Luxury Rooms</p>
              </div>

              <div className="text-center">
                <CalendarDays className="mx-auto text-red-500 mb-3" />
                <p className="text-white">Flexible Booking</p>
              </div>

              <div className="text-center">
                <Users className="mx-auto text-red-500 mb-3" />
                <p className="text-white">Family Friendly</p>
              </div>

            </div>
          </div>
        </div>
      </section>
    </>
  );
}