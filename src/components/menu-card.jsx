import React from "react";
import { motion } from "framer-motion";
import { useCartStore } from "@/src/lib/cart-store";
import { Star, Plus, Leaf } from "lucide-react";

export function MenuCard({ item }) {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: 1,
      image: item.image,
      category: item.category,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-gradient-to-br from-gray-900 to-black border border-red-600/30 rounded-lg overflow-hidden hover:border-red-600 transition group"
    >
      {/* Image Container */}
      <div className="relative h-64 overflow-hidden bg-gray-800">
        <img
          src={item.image}
          alt={item.name}
          className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-110 transition duration-300"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center gap-2 flex-wrap">
          {item.isVeg && (
            <div className="bg-green-600 text-white px-2 py-1 rounded text-xs font-semibold flex items-center gap-1">
              <Leaf className="w-3 h-3" />
              Veg
            </div>
          )}
          {!item.isVeg && (
            <div className="bg-red-600 text-white px-2 py-1 rounded text-xs font-semibold">
              Non-Veg
            </div>
          )}
          {item.isPopular && (
            <div className="bg-yellow-500 text-black px-2 py-1 rounded text-xs font-bold">
              Popular
            </div>
          )}
          {item.isLimited && (
            <div className="bg-orange-600 text-white px-2 py-1 rounded text-xs font-bold animate-pulse">
              Limited
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        <div>
          <h3 className="text-white font-bold text-lg line-clamp-1">
            {item.name}
          </h3>
          <p className="text-gray-400 text-sm line-clamp-2">
            {item.description}
          </p>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2">
          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
          <span className="text-yellow-500 font-semibold">{item.rating}</span>
          <span className="text-gray-500 text-sm">
            {item.preparationTime}min
          </span>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-700">
          <div>
            <p className="text-gray-400 text-xs">Price</p>
            <p className="text-red-500 font-bold text-xl">₹{item.price}</p>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAddToCart}
            className="bg-gradient-to-r from-red-600 to-red-700 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 hover:shadow-lg hover:shadow-red-600/50 transition"
          >
            <Plus className="w-4 h-4" />
            <span className="text-sm">Add</span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
