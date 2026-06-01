import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Pizza, Drumstick, IceCream, Coffee, Soup, Salad } from "lucide-react";

const categories = [
  {
    title: "Starters",
    slug: "Starters",
    image: "/categories/starters.jpg",
    icon: Soup,
    description: "Crispy and flavorful appetizers",
  },
  {
    title: "Main Course",
    slug: "Main Course",
    image: "/categories/main-course.jpg",
    icon: Drumstick,
    description: "Authentic Indian signature dishes",
  },
  {
    title: "Fast Food",
    slug: "Fast Food",
    image: "/categories/fast-food.jpg",
    icon: Pizza,
    description: "Delicious burgers, pizza & snacks",
  },
  {
    title: "Desserts",
    slug: "Desserts",
    image: "/categories/desserts.jpg",
    icon: IceCream,
    description: "Sweet treats & traditional sweets",
  },
  {
    title: "Beverages",
    slug: "Beverages",
    image: "/categories/beverages.jpg",
    icon: Coffee,
    description: "Refreshing drinks & mocktails",
  },
  {
    title: "Healthy",
    slug: "Healthy",
    image: "/categories/healthy.jpg",
    icon: Salad,
    description: "Fresh salads & healthy meals",
  },
];

export default function CategoriesSection() {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-black to-gray-950">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Explore Categories
          </h2>
          <p className="text-gray-400 mt-4 text-lg max-w-2xl mx-auto">
            Discover a wide variety of delicious dishes crafted with authentic
            flavors and premium ingredients.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => {
            const Icon = category.icon;

            return (
              <Link
                key={index}
                to={`/menu?category=${encodeURIComponent(category.slug)}`}
              >
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.03 }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative overflow-hidden rounded-2xl border border-gray-800 cursor-pointer h-72"
                >
                  <img
                    src={category.image}
                    alt={category.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-black/70" />
                  <div className="relative z-10 p-8 h-full flex flex-col justify-end">
                    <div className="w-16 h-16 rounded-full bg-red-600/20 flex items-center justify-center mb-6">
                      <Icon className="w-8 h-8 text-red-500" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3">
                      {category.title}
                    </h3>
                    <p className="text-gray-300">{category.description}</p>
                  </div>
                </motion.div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
