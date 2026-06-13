"use client";
import { useCart } from "@/src/context/cart-context";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

import { useEffect, useState } from "react";

export default function ProductListing() {
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchFeaturedItems = async () => {
      try {
        const res = await fetch(
          "http://localhost:3000/api/menu/featured"
        );

        const data = await res.json();

        console.log(data);

        setProducts(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchFeaturedItems();
  }, []);


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
          {products.map((item, index) => {
            const isVeg = item.isVeg === true;

            return (
              <motion.div
                key={item._id}
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
                    className={`absolute top-4 left-4 px-3 py-1 rounded-full text-sm font-medium ${isVeg ? "bg-green-600 text-white" : "bg-red-600 text-white"
                      }`}
                  >
                    {isVeg ? "🥦 Veg" : "🍗 Non-Veg"}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-2xl font-bold text-white">{item.name}</h3>

                    <div className="flex items-center gap-1 text-yellow-400">
                      <Star className="w-5 h-5 fill-yellow-400" />
                      <span>{item.rating || 4.5}</span>
                    </div>
                  </div>

                  <p className="text-gray-400 mb-6">{item.description}</p>

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
            );
          })}
        </div>
      </div>
    </section>
  );
}  