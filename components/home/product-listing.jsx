"use client";
import { useCart } from "@/context/cart-context";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const products = [
  {
    id: 1,
    name: "Butter Chicken",
    price: "₹349",
    rating: "4.9",
    image:
      "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?q=80&w=2070&auto=format&fit=crop",
    type: "Non-Veg",
  },
  {
    id: 2,
    name: "Paneer Tikka",
    price: "₹279",
    rating: "4.8",
    image:
      "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?q=80&w=2070&auto=format&fit=crop",
    type: "Veg",
  },
  {
    id: 3,
    name: "Veg Biryani",
    price: "₹299",
    rating: "4.7",
    image:
      "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?q=80&w=2070&auto=format&fit=crop",
    type: "Veg",
  },
  {
    id: 4,
    name: "Chicken Pizza",
    price: "₹399",
    rating: "4.8",
    image:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=2070&auto=format&fit=crop",
    type: "Non-Veg",
  },
];

export default function ProductListing() {
  const { addToCart } = useCart();
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-black to-gray-950">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Featured Dishes
          </h2>

          <p className="text-gray-400 mt-4 text-lg max-w-2xl mx-auto">
            Discover our chef’s special dishes crafted with authentic Indian
            flavors and premium ingredients.
          </p>
        </motion.div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((item, index) => (
            <motion.div
              key={item.id}
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
                  className="w-full h-60 object-cover group-hover:scale-105 transition duration-500"
                />

                {/* Veg/NonVeg Badge */}
                <span
                  className={`absolute top-4 left-4 px-3 py-1 rounded-full text-sm font-medium ${
                    item.type === "Veg"
                      ? "bg-green-600 text-white"
                      : "bg-red-600 text-white"
                  }`}
                >
                  {item.type}
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
                  Rich taste, authentic spices, and premium quality ingredients
                  in every bite.
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-red-500">
                    {item.price}
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
