"use client";

import { useCart } from "@/src/context/cart-context";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const trendingItems = [
  {
    _id: "trending-1",
    name: "Butter Chicken",
    price: 349,
    rating: "4.9",
    image:
      "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?q=80&w=2070&auto=format&fit=crop",
    badge: "Bestseller",
  },
  {
    _id: "trending-2",
    name: "Paneer Tikka",
    price: 279,
    rating: "4.8",
    image:
      "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?q=80&w=2070&auto=format&fit=crop",
    badge: "Popular",
  },
  {
    _id: "trending-3",
    name: "Veg Biryani",
    price: 299,
    rating: "4.7",
    image:
      "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?q=80&w=2070&auto=format&fit=crop",
    badge: "Trending",
  },
];

export default function TrendingSection() {
  const { addToCart } = useCart();
  return (
    <section className="py-20 px-4 bg-black">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Trending Dishes
          </h2>

          <p className="text-gray-400 mt-4 text-lg max-w-2xl mx-auto">
            Taste our most loved and highly rated dishes prepared fresh by
            expert chefs.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {trendingItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-900/40 border border-gray-800 rounded-2xl overflow-hidden hover:border-red-600/40 transition duration-300 group"
            >
              {/* Image */}
              <div className="relative overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-64 object-cover group-hover:scale-105 transition duration-500"
                />

                {/* Badge */}
                <span className="absolute top-4 left-4 bg-red-600 text-white text-sm px-3 py-1 rounded-full font-medium">
                  {item.badge}
                </span>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-2xl font-bold text-white">{item.name}</h3>

                  <div className="flex items-center gap-1 text-yellow-400">
                    <Star className="w-5 h-5 fill-yellow-400" />
                    <span>{item.rating}</span>
                  </div>
                </div>

                <p className="text-gray-400 mb-6">
                  Rich flavors, premium ingredients, and authentic Indian taste
                  in every bite.
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-red-500">
                    ₹{item.price}
                  </span>

                  <button
                    onClick={() => addToCart(item)}
                    className="bg-red-600 hover:bg-red-700 transition px-5 py-2 rounded-lg text-white font-semibold"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
