import React from "react";
import { Link } from "react-router-dom";
import { Wifi, Car, Coffee, Tv } from "lucide-react";

<section id="rooms"></section>

const rooms = [
  {
    name: "Deluxe Room",
    price: "₹3,499 / Night",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945",
  },
  {
    name: "Premium Suite",
    price: "₹5,999 / Night",
    image:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b",
  },
  {
    name: "Royal Suite",
    price: "₹8,999 / Night",
    image:
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461",
  },
];

export default function RoomsSection() {
  return (
    <section
      id="rooms"
      className="py-24 px-4 bg-gradient-to-b from-black via-[#120909] to-black"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="uppercase tracking-[8px] text-red-500 text-sm font-semibold mb-4">
            Luxury Stay
          </p>

          <h2 className="text-4xl md:text-6xl font-bold text-white">
            Rooms &
            <span className="text-red-500"> Suites</span>
          </h2>

          <p className="text-gray-400 text-lg mt-6 max-w-3xl mx-auto">
            Experience comfort, elegance and premium hospitality
            with our luxurious rooms and suites.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {rooms.map((room, index) => (
            <div
              key={index}
              className="bg-zinc-900 border border-red-600/20 rounded-3xl overflow-hidden hover:border-red-500 transition"
            >
              <img
                src={room.image}
                alt={room.name}
                className="h-72 w-full object-cover"
              />

              <div className="p-6">
                <h3 className="text-white text-2xl font-bold mb-3">
                  {room.name}
                </h3>

                <p className="text-red-500 text-xl font-semibold mb-5">
                  {room.price}
                </p>

                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="flex items-center gap-2 text-gray-400">
                    <Wifi size={18} />
                    WiFi
                  </div>

                  <div className="flex items-center gap-2 text-gray-400">
                    <Car size={18} />
                    Parking
                  </div>

                  <div className="flex items-center gap-2 text-gray-400">
                    <Coffee size={18} />
                    Breakfast
                  </div>

                  <div className="flex items-center gap-2 text-gray-400">
                    <Tv size={18} />
                    Smart TV
                  </div>
                </div>

                <Link
                  to="/room-booking"
                  className="block text-center bg-red-600 hover:bg-red-700 transition py-3 rounded-xl text-white font-semibold"
                >
                  Book Now
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}