"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

const menuItems = [
  {
    id: 1,
    name: "Spiced Tandoori Chicken",
    description: "Marinated in yogurt and Indian spices",
    price: 450,
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1599599810694-cd881f6a3e6f?w=400&h=300&fit=crop",
    category: "Main Course",
    isVeg: false,
    isPopular: true,
    isLimited: false,
  },
  {
    id: 2,
    name: "Paneer Tikka Masala",
    description: "Cottage cheese in creamy tomato sauce",
    price: 380,
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1599599810694-cd881f6a3e6f?w=400&h=300&fit=crop",
    category: "Main Course",
    isVeg: true,
    isPopular: true,
    isLimited: true,
  },
  {
    id: 3,
    name: "Garlic Naan",
    description: "Fresh tandoori bread with aromatic garlic",
    price: 80,
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1599599810694-cd881f6a3e6f?w=400&h=300&fit=crop",
    category: "Breads",
    isVeg: true,
    isPopular: false,
    isLimited: false,
  },
  {
    id: 4,
    name: "Biryani Special",
    description: "Fragrant rice cooked with premium spices",
    price: 520,
    rating: 4.6,
    image:
      "https://images.unsplash.com/photo-1599599810694-cd881f6a3e6f?w=400&h=300&fit=crop",
    category: "Rice",
    isVeg: false,
    isPopular: true,
    isLimited: false,
  },
  {
    id: 5,
    name: "Butter Chicken Feast",
    description: "Tender chicken in rich butter sauce",
    price: 480,
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1599599810694-cd881f6a3e6f?w=400&h=300&fit=crop",
    category: "Main Course",
    isVeg: false,
    isPopular: false,
    isLimited: true,
  },
  {
    id: 6,
    name: "Mixed Vegetable Curry",
    description: "Seasonal vegetables in aromatic gravy",
    price: 280,
    rating: 4.5,
    image:
      "https://images.unsplash.com/photo-1599599810694-cd881f6a3e6f?w=400&h=300&fit=crop",
    category: "Main Course",
    isVeg: true,
    isPopular: false,
    isLimited: false,
  },
  {
    id: 7,
    name: "Spring Rolls",
    description: "Crispy vegetable spring rolls",
    price: 220,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=400",
    category: "Starters",
    isVeg: true,
    isPopular: true,
    isLimited: false,
  },

  {
    id: 8,
    name: "Veg Burger",
    description: "Loaded burger with cheese",
    price: 180,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400",
    category: "Fast Food",
    isVeg: true,
    isPopular: true,
    isLimited: false,
  },

  {
    id: 9,
    name: "Chocolate Brownie",
    description: "Warm brownie with chocolate",
    price: 150,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400",
    category: "Desserts",
    isVeg: true,
    isPopular: true,
    isLimited: false,
  },

  {
    id: 10,
    name: "Cold Coffee",
    description: "Refreshing cold coffee",
    price: 120,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400",
    category: "Beverages",
    isVeg: true,
    isPopular: false,
    isLimited: false,
  },

  {
    id: 11,
    name: "Greek Salad",
    description: "Fresh healthy salad",
    price: 240,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400",
    category: "Healthy",
    isVeg: true,
    isPopular: false,
    isLimited: false,
  },
];

const buttonVariants = [
  "⚡ Quick Add",
  "🍽️ Add to Feast",
  "🍔 Grab This",
  "🔥 Taste Now",
  "✨ Customize",
  "🛒 Add to Tray",
];

export function FoodMenu() {
  const [cart, setCart] = useState([]);
  const [hoveredId, setHoveredId] = useState(null);
  const [quantities, setQuantities] = useState({});

  const addToCart = (itemId) => {
    setCart([...cart, itemId]);
    setQuantities((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }));
  };

  const toggleFavorite = (itemId, e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <section className="w-full py-16 px-4 md:px-8 bg-black relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-red-600/5 to-black pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Premium Menu Selection
          </h2>
          <p className="text-neutral-400 text-lg">
            Handpicked dishes crafted by our top chefs
          </p>
        </motion.div>

        {/* Menu Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {menuItems.map((item, index) => (
            <motion.div
              key={item.id}
              variants={itemVariants}
              onHoverStart={() => setHoveredId(item.id)}
              onHoverEnd={() => setHoveredId(null)}
              className="group cursor-pointer"
            >
              <div className="relative h-64 mb-4 rounded-xl overflow-hidden">
                {/* Image with gradient overlay */}
                <motion.div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: item.image
                      ? `url(${item.image})`
                      : undefined,
                    backgroundColor: item.image ? undefined : "#2d2d2d",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                  animate={
                    hoveredId === item.id ? { scale: 1.1 } : { scale: 1 }
                  }
                  transition={{ duration: 0.3 }}
                />

                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                {/* Popular Badge */}
                {item.isPopular && (
                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    className="absolute top-4 left-4 px-3 py-1 bg-red-600 text-white text-xs font-bold rounded-full"
                  >
                    ⭐ Popular
                  </motion.div>
                )}

                {/* Limited Offer Ribbon */}
                {item.isLimited && (
                  <motion.div
                    initial={{ x: 20, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    className="absolute top-4 right-4 px-3 py-1 bg-orange-500 text-white text-xs font-bold rounded-full"
                  >
                    Limited
                  </motion.div>
                )}

                {/* Veg/Non-veg Indicator */}
                <div className="absolute bottom-4 left-4">
                  <div
                    className={`w-6 h-6 rounded border-2 flex items-center justify-center text-xs font-bold ${
                      item.isVeg
                        ? "border-green-500 text-green-500 bg-green-500/10"
                        : "border-red-500 text-red-500 bg-red-500/10"
                    }`}
                  >
                    {item.isVeg ? "🌱" : "🥩"}
                  </div>
                </div>

                {/* Favorite Heart */}
                <motion.button
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={(e) => toggleFavorite(item.id, e)}
                  className="absolute bottom-4 right-4 p-2 rounded-full bg-white/20 backdrop-blur-md hover:bg-red-600 transition-colors"
                >
                  <Heart className="w-5 h-5 text-white" />
                </motion.button>
              </div>

              {/* Card Content */}
              <div className="space-y-3">
                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-red-400 transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-sm text-neutral-400 mt-1">
                    {item.description}
                  </p>
                </div>

                {/* Rating and Price */}
                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-white">
                      ★ {item.rating}
                    </span>
                    <span className="text-xs text-neutral-500">
                      ({Math.floor(Math.random() * 500) + 50})
                    </span>
                  </div>
                  <span className="text-xl font-bold text-red-500">
                    ₹{item.price}
                  </span>
                </div>

                {/* Add to Cart Button */}
                <motion.button
                  whileHover={{
                    scale: 1.02,
                    boxShadow: "0 0 20px rgba(220, 38, 38, 0.5)",
                  }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => addToCart(item.id)}
                  className="w-full py-3 px-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold rounded-lg transition-all duration-300 flex items-center justify-center gap-2 group relative overflow-hidden"
                >
                  <span className="relative z-10">
                    {buttonVariants[index % buttonVariants.length]}
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-600"
                    initial={{ x: -100 }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                    style={{ zIndex: 0 }}
                  />
                </motion.button>

                {/* Quantity indicator */}
                {quantities[item.id] > 0 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center text-sm font-semibold text-green-400"
                  >
                    Added {quantities[item.id]} × to cart
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Cart Count */}
        {cart.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed bottom-8 right-8 bg-red-600 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold shadow-2xl"
          >
            {cart.length}
          </motion.div>
        )}
      </div>
    </section>
  );
}
