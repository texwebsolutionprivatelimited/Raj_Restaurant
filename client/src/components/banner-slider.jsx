import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { bannerImages } from "@/src/lib/menu-data";

export function BannerSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto Slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === bannerImages.length - 1 ? 0 : prev + 1,
      );
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  // Previous Slide
  const goToPrevious = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? bannerImages.length - 1 : prev - 1,
    );
  };

  // Next Slide
  const goToNext = () => {
    setCurrentIndex((prev) =>
      prev === bannerImages.length - 1 ? 0 : prev + 1,
    );
  };

  // Dot Navigation
  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
<div className="relative w-full h-[500px] sm:h-[650px] lg:h-[850px] overflow-hidden rounded-3xl">      {/* Slides */}
      <AnimatePresence mode="sync">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 0.6,
            ease: "easeInOut",
          }}
          className="absolute inset-0"
        >
          {/* Image */}
          <img
            src={bannerImages[currentIndex].url}
            alt={bannerImages[currentIndex].title}
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/75" />

          {/* Content */}
        {/* Content */}
<div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 z-10 -mt-20">

  <motion.span
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.2, duration: 0.8 }}
    className="uppercase tracking-[8px] text-yellow-400 text-sm md:text-base font-semibold mb-2"
  >
    Welcome To
  </motion.span>

  <motion.h1
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.4, duration: 0.8 }}
    className="font-black leading-[0.9]"
  >
    <span className="block text-white text-6xl sm:text-7xl md:text-8xl lg:text-[120px]">
      RAJ
    </span>

    <span className="block bg-gradient-to-r from-yellow-300 via-yellow-500 to-amber-600 bg-clip-text text-transparent text-6xl sm:text-7xl md:text-8xl lg:text-[120px]">
      RESTAURANT
    </span>
  </motion.h1>

  <motion.p
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.6, duration: 0.8 }}
    className="text-gray-200 text-base md:text-xl mt-5 max-w-3xl"
  >
    Experience authentic flavors, luxury dining, and unforgettable moments
    crafted with passion and tradition.
  </motion.p>

  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.8, duration: 0.8 }}
    className="flex flex-col sm:flex-row gap-4 mt-8"
  >
    <button className="bg-red-600 hover:bg-red-700 transition px-8 py-4 rounded-xl text-white font-semibold shadow-lg shadow-red-600/40">
      Explore Menu
    </button>

    <button className="border border-yellow-500 text-yellow-400 hover:bg-yellow-500 hover:text-black transition px-8 py-4 rounded-xl font-semibold">
      Book Table
    </button>
  </motion.div>

</div>
        </motion.div>
      </AnimatePresence>

      {/* Left Arrow */}
      <button
        onClick={goToPrevious}
        className="absolute left-5 top-1/2 -translate-y-1/2 z-20 bg-black/40 hover:bg-black/60 backdrop-blur-md text-white p-3 rounded-full transition"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      {/* Right Arrow */}
      <button
        onClick={goToNext}
        className="absolute right-5 top-1/2 -translate-y-1/2 z-20 bg-black/40 hover:bg-black/60 backdrop-blur-md text-white p-3 rounded-full transition"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {bannerImages.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`rounded-full transition-all duration-300 ${currentIndex === index
                ? "w-8 h-3 bg-red-600"
                : "w-3 h-3 bg-white/50 hover:bg-white"
              }`}
          />
        ))}
      </div>
    </div>
  );
}