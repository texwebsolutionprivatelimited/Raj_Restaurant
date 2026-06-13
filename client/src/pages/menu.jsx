
import { useSearchParams } from "react-router-dom";
import { menuItems, dietCategories } from "@/src/lib/menu-data";
import React, { useState, useMemo, Suspense, useEffect } from "react";
import { Header } from "@/src/components/header";
import { MenuCard } from "@/src/components/menu-card";
import { motion } from "framer-motion";
import { Search, Leaf, Flame } from "lucide-react";

function MenuContent() {
  const [selectedDiet, setSelectedDiet] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchParams] = useSearchParams();
  const [items, setItems] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState("all");
  //const selectedCategory = searchParams.get("category");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const tableId = searchParams.get("table");

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      // DIET FILTER
      let dietMatch = true;

      if (selectedCategory === "veg") {
        dietMatch = item.isVeg === true;
      }
      else if (selectedCategory === "non-veg") {
        dietMatch = item.isVeg === false;
      }

      // CATEGORY FILTER (ONLY FOR FOOD TYPE)
      let categoryMatch = true;

      const categoryList = ["Sweets", "Beverages", "Spicy"];

      if (categoryList.includes(selectedCategory)) {
        categoryMatch = item.category === selectedCategory;
      }

      // SEARCH FILTER
      const searchMatch = item.name
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase());

      return dietMatch && categoryMatch && searchMatch;
    });
  }, [items, selectedCategory, searchQuery]);

  useEffect(() => {
    const token = localStorage.getItem("adminToken") || localStorage.getItem("userToken");

    fetch("http://localhost:3000/api/admin/menu", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("API DATA:", data);

        const safeItems =
          Array.isArray(data)
            ? data
            : data.menu || data.data || [];

        setItems(safeItems);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <Header />
      <div className="min-h-screen bg-black pt-32 pb-12 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Page Title */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <h1 className="text-4xl font-bold text-white mb-2">Our Menu</h1>
            <p className="text-gray-400">
              Explore our delicious selection of authentic Indian dishes
            </p>
            {tableId && (
              <div className="mt-4 inline-flex items-center px-4 py-2 rounded-full bg-red-600/20 border border-red-600/30 text-red-400 font-semibold">
                🍽️ Ordering for Table #{tableId}
              </div>
            )}
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8"
          >
            <div className="relative">
              <Search className="absolute left-4 top-3 w-5 h-5 text-gray-500" />
              <input
                type="text"
                placeholder="Search dishes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-900 text-white pl-12 pr-4 py-3 rounded-lg border border-red-600/30 focus:border-red-600 focus:outline-none transition"
              />
            </div>
          </motion.div>

          {/* Diet Filter 
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-10"
          >
            <h3 className="text-white font-semibold mb-4">Filter by Diet</h3>
            <div className="flex flex-wrap gap-3">
              {dietCategories.map((category) => (
                <motion.button
                  key={category.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedDiet(category.id)}
                  className={`px-6 py-2 rounded-full font-semibold transition flex items-center gap-2 ${selectedDiet === category.id
                    ? "bg-red-600 text-white"
                    : "bg-gray-900 text-gray-300 hover:text-white border border-gray-700"
                    }`}
                >
                  {category.id === "veg" && <Leaf className="w-4 h-4" />}
                  {category.id === "non-veg" && <Flame className="w-4 h-4" />}
                  {category.label}
                </motion.button>
              ))}
            </div>
          </motion.div>
          */}

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-10"
          >
            <h3 className="text-white font-semibold mb-4">Filter Menu</h3>

            <div className="flex flex-wrap gap-3">

              {/* ALL */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory("all")}
                className={`px-6 py-2 rounded-full font-semibold transition ${selectedCategory === "all"
                  ? "bg-red-600 text-white"
                  : "bg-gray-900 text-gray-300 border border-gray-700"
                  }`}
              >
                All
              </motion.button>

              {/* VEG */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory("veg")}
                className={`px-6 py-2 rounded-full font-semibold flex items-center gap-2 transition ${selectedCategory === "veg"
                  ? "bg-green-600 text-white"
                  : "bg-gray-900 text-gray-300 border border-gray-700"
                  }`}
              >
                <Leaf className="w-4 h-4" />
                Veg
              </motion.button>

              {/* NON VEG */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory("non-veg")}
                className={`px-6 py-2 rounded-full font-semibold flex items-center gap-2 transition ${selectedCategory === "non-veg"
                  ? "bg-red-600 text-white"
                  : "bg-gray-900 text-gray-300 border border-gray-700"
                  }`}
              >
                <Flame className="w-4 h-4" />
                Non-Veg
              </motion.button>

              {/* SWEETS */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory("Sweets")}
                className={`px-6 py-2 rounded-full font-semibold transition ${selectedCategory === "Sweets"
                  ? "bg-pink-600 text-white"
                  : "bg-gray-900 text-gray-300 border border-gray-700"
                  }`}
              >
                🍰 Sweets
              </motion.button>

              {/* BEVERAGES */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory("Beverages")}
                className={`px-6 py-2 rounded-full font-semibold transition ${selectedCategory === "Beverages"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-900 text-gray-300 border border-gray-700"
                  }`}
              >
                🥤 Beverages
              </motion.button>

              {/* SPICY */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory("Spicy")}
                className={`px-6 py-2 rounded-full font-semibold transition ${selectedCategory === "Spicy"
                  ? "bg-orange-600 text-white"
                  : "bg-gray-900 text-gray-300 border border-gray-700"
                  }`}
              >
                🌶️ Spicy
              </motion.button>

            </div>
          </motion.div>


          {/* Menu Grid */}
          {filteredItems.length > 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {filteredItems.map((item) => (
                <MenuCard key={item._id} item={item} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <p className="text-gray-400 text-lg">
                No items found matching your search
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedDiet("all");
                }}
                className="mt-4 text-red-500 hover:text-red-400 font-semibold transition"
              >
                Clear filters
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </>
  );
}

export default function MenuPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black pt-32 pb-12 px-4 text-center text-white">Loading Menu...</div>}>
      <MenuContent />
    </Suspense>
  );
}
