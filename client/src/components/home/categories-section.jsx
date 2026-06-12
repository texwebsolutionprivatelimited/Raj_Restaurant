import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Pizza,
  Drumstick,
  IceCream,
  Coffee,
  Soup,
  Salad,
  ChefHat,
} from "lucide-react";

export default function CategoriesSection() {
  const [categories, setCategories] = useState([]);
  const [image, setImage] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/categories");
        const data = await res.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const getIcon = (iconName) => {
    switch (iconName) {
      case "Pizza":
        return Pizza;
      case "Drumstick":
        return Drumstick;
      case "IceCream":
        return IceCream;
      case "Coffee":
        return Coffee;
      case "Soup":
        return Soup;
      case "Salad":
        return Salad;
      default:
        return ChefHat;
    }
  };

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
            const Icon = getIcon(category.icon);

            return (
              <Link
                key={category._id}
                to={`/menu?category=${encodeURIComponent(category.name)}`}
              >
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.03 }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative overflow-hidden rounded-2xl border border-gray-800 cursor-pointer h-72"
                >
                  <img
                    src={
                      category.image ||
                      "/categories/default-category.jpg"
                    }
                    alt={category.name}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition duration-500"
                  />

                  <div className="absolute inset-0 bg-black/70" />

                  <div className="relative z-10 p-8 h-full flex flex-col justify-end">
                    <div className="w-16 h-16 rounded-full bg-red-600/20 flex items-center justify-center mb-6">
                      <Icon className="w-8 h-8 text-red-500" />
                    </div>

                    <h3 className="text-2xl font-bold text-white mb-3">
                      {category.name}
                    </h3>

                    <p className="text-gray-300">
                      {category.description}
                    </p>
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