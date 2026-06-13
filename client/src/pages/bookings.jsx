import React, { useState } from "react";
import { Header } from "@/src/components/header";
import { motion } from "framer-motion";
import { Calendar, Clock, Users, Phone, CheckCircle2 } from "lucide-react";

export default function BookingsPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    guests: "2",
    date: "",
    time: "",
    occasion: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      formData.name &&
      formData.email &&
      formData.phone &&
      formData.date &&
      formData.time
    ) {
      setSubmitted(true);
      setTimeout(() => {
        setFormData({
          name: "",
          email: "",
          phone: "",
          guests: "2",
          date: "",
          time: "",
          occasion: "",
        });
        setSubmitted(false);
      }, 3000);
    } else {
      alert("Please fill in all required fields");
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-black py-32 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <h1 className="text-4xl font-bold text-white mb-2">Book a Table</h1>
            <p className="text-gray-400">
              Reserve your perfect dining experience at Raj Restaurant
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <form
                onSubmit={handleSubmit}
                className="bg-gradient-to-br from-gray-900 to-black border border-red-600/30 rounded-lg p-8 space-y-6"
              >
                {/* Name */}
                <div>
                  <label className="block text-white font-semibold mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                    className="w-full bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-700 focus:border-red-600 focus:outline-none"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-white font-semibold mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    className="w-full bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-700 focus:border-red-600 focus:outline-none"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-white font-semibold mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 9999999999"
                    className="w-full bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-700 focus:border-red-600 focus:outline-none"
                  />
                </div>

                {/* Guests */}
                <div>
                  <label className="block text-white font-semibold mb-2">
                    Number of Guests
                  </label>
                  <select
                    name="guests"
                    value={formData.guests}
                    onChange={handleChange}
                    className="w-full bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-700 focus:border-red-600 focus:outline-none"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                      <option key={n} value={n}>
                        {n} {n === 1 ? "Guest" : "Guests"}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Date */}
                <div>
                  <label className="block text-white font-semibold mb-2">
                    Date *
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-700 focus:border-red-600 focus:outline-none"
                  />
                </div>

                {/* Time */}
                <div>
                  <label className="block text-white font-semibold mb-2">
                    Time *
                  </label>
                  <input
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    className="w-full bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-700 focus:border-red-600 focus:outline-none"
                  />
                </div>

                {/* Occasion */}
                <div>
                  <label className="block text-white font-semibold mb-2">
                    Occasion (Optional)
                  </label>
                  <input
                    type="text"
                    name="occasion"
                    value={formData.occasion}
                    onChange={handleChange}
                    placeholder="Birthday, Anniversary, etc."
                    className="w-full bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-700 focus:border-red-600 focus:outline-none"
                  />
                </div>

                {/* Submit Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-3 rounded-lg font-bold text-lg hover:shadow-lg hover:shadow-red-600/50 transition"
                >
                  Reserve Table
                </motion.button>

                {submitted && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-green-900/30 border border-green-600 rounded-lg p-4 flex items-center gap-3"
                  >
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                    <p className="text-green-400">
                      Booking request sent! We&apos;ll confirm via email.
                    </p>
                  </motion.div>
                )}
              </form>
            </motion.div>

            {/* Info Box */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="bg-gradient-to-br from-gray-900 to-black border border-red-600/30 rounded-lg p-8 space-y-8">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-6">
                    Booking Information
                  </h3>
                </div>

                {[
                  {
                    icon: Calendar,
                    title: "Flexible Dates",
                    desc: "Book your table for any date that works for you",
                  },
                  {
                    icon: Clock,
                    title: "Available Hours",
                    desc: "Lunch: 12:00 PM - 4:00 PM\nDinner: 6:00 PM - 11:00 PM",
                  },
                  {
                    icon: Users,
                    title: "Group Bookings",
                    desc: "Special rates available for groups of 10+",
                  },
                  {
                    icon: Phone,
                    title: "Contact Us",
                    desc: "+91-9999-999-999\nsupport@rajrestaurant.com",
                  },
                ].map((item, i) => (
                  <motion.div key={i} whileHover={{ y: -5 }}>
                    <div className="flex gap-4">
                      <item.icon className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="text-white font-bold mb-1">
                          {item.title}
                        </h4>
                        <p className="text-gray-400 text-sm whitespace-pre-line">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}

                <div className="bg-red-600/10 border border-red-600/30 rounded-lg p-4">
                  <p className="text-gray-300 text-sm">
                    <span className="text-red-500 font-bold">Note:</span> For
                    bookings of 15+ guests, please contact us directly for
                    special arrangements.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
}
