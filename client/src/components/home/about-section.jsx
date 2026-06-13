import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Users, UtensilsCrossed, ChefHat, Award } from "lucide-react";

export default function AboutSection() {
  return (
    <section className="relative py-28 bg-black overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 left-20 w-72 h-72 bg-red-600/10 blur-[120px]" />
        <div className="absolute bottom-10 right-20 w-72 h-72 bg-red-500/10 blur-[120px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="uppercase tracking-[8px] text-red-500 text-sm font-semibold mb-4">
            Welcome To Raj Restaurant
          </p>

          <h2 className="text-white text-4xl md:text-6xl font-bold leading-tight">
            A Culinary Journey
            <br />
            Through The Finest
            <span className="text-red-500"> Indian Flavors</span>
          </h2>

          <div className="w-24 h-1 bg-red-600 mx-auto mt-6 rounded-full" />
        </motion.div>

        {/* Main Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-br from-zinc-900 to-black border border-red-600/20 rounded-3xl p-8 md:p-14 shadow-2xl"
        >
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <h3 className="text-white text-3xl md:text-4xl font-bold mb-6">
                About Raj Restaurant
              </h3>

              <p className="text-gray-300 text-lg leading-8 mb-6">
                Raj Restaurant is more than just a place to eat. It is a
                destination where authentic Indian cuisine, warm hospitality,
                and unforgettable experiences come together.
              </p>

              <p className="text-gray-400 leading-8">
                Whether you're enjoying a family dinner, celebrating a special
                occasion, hosting a corporate gathering, or ordering your
                favorite dishes online, every meal is crafted with passion and
                served with care.
              </p>

              <div className="flex flex-wrap gap-4 mt-8">
                <Link
                  to="/menu"
                  className="bg-red-600 hover:bg-red-700 px-8 py-4 rounded-xl text-white font-semibold transition"
                >
                  Explore Menu
                </Link>

                <Link
                  to="/bookings"
                  className="border border-red-600 text-white hover:bg-red-600 px-8 py-4 rounded-xl font-semibold transition"
                >
                  Book Table
                </Link>
              </div>
            </div>

            {/* Right Stats */}
            <div className="grid grid-cols-2 gap-5">
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
                <Users className="text-red-500 mb-4" />
                <h4 className="text-white text-4xl font-bold">10K+</h4>
                <p className="text-gray-400 mt-2">Happy Guests</p>
              </div>

              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
                <UtensilsCrossed className="text-red-500 mb-4" />
                <h4 className="text-white text-4xl font-bold">500+</h4>
                <p className="text-gray-400 mt-2">Signature Dishes</p>
              </div>

              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
                <ChefHat className="text-red-500 mb-4" />
                <h4 className="text-white text-4xl font-bold">15+</h4>
                <p className="text-gray-400 mt-2">Expert Chefs</p>
              </div>

              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
                <Award className="text-red-500 mb-4" />
                <h4 className="text-white text-4xl font-bold">10+</h4>
                <p className="text-gray-400 mt-2">Years Excellence</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}