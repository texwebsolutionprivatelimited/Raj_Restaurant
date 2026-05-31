"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    id: 1,
    title: "Delicious Food Delivered Fast",
    description: "Fresh, hot meals delivered to your doorstep in 30 minutes",
    image: "linear-gradient(135deg, #8B0000 0%, #DC143C 100%)",
    cta: "Explore Menu",
  },
  {
    id: 2,
    title: "Premium Dining Experience",
    description: "Michelin-inspired dishes from top chefs worldwide",
    image: "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)",
    cta: "Order Now",
  },
  {
    id: 3,
    title: "Special Festival Offers",
    description: "Up to 50% off on your favorite restaurants",
    image: "linear-gradient(135deg, #DC143C 0%, #FF6347 100%)",
    cta: "Claim Offer",
  },
  {
    id: 4,
    title: "Exclusive Combos & Discounts",
    description: "Save more with our curated meal bundles",
    image: "linear-gradient(135deg, #8B0000 0%, #1a1a1a 100%)",
    cta: "View Combos",
  },
  {
    id: 5,
    title: "Book Table for Family Dinner",
    description: "Reserve your table at premium restaurants instantly",
    image: "linear-gradient(135deg, #2d2d2d 0%, #DC143C 100%)",
    cta: "Book Now",
  },
];

export function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const paginate = (newDirection) => {
    setDirection(newDirection);
    setCurrent((prev) => (prev + newDirection + slides.length) % slides.length);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      {/* Background Gradient */}
      <div
        className="absolute inset-0 z-0"
        style={{ background: slides[current].image }}
      />

      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-black/70 z-10" />

      {/* Animated Content */}
      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
          key={current}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-0 flex items-center justify-start pl-12 z-20"
        >
          <div className="max-w-2xl text-white space-y-6">
            {/* Animated Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-6xl md:text-7xl font-bold tracking-tight text-balance leading-tight"
            >
              {slides[current].title}
            </motion.h1>

            {/* Animated Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-xl md:text-2xl text-neutral-200 text-balance"
            >
              {slides[current].description}
            </motion.p>

            {/* Animated CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex gap-4 pt-4"
            >
              <button className="px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
                {slides[current].cta}
              </button>
              <button className="px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-all duration-300">
                Learn More
              </button>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => paginate(-1)}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-40 p-3 bg-white/20 hover:bg-white/40 rounded-full backdrop-blur-md transition-colors"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => paginate(1)}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-40 p-3 bg-white/20 hover:bg-white/40 rounded-full backdrop-blur-md transition-colors"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </motion.button>

      {/* Dots Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-40 flex gap-2">
        {slides.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => {
              setDirection(index > current ? 1 : -1);
              setCurrent(index);
            }}
            className={`h-2 rounded-full transition-all ${
              index === current ? "bg-red-600 w-8" : "bg-white/50 w-2"
            }`}
            whileHover={{ scale: 1.2 }}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white/60 z-40"
      >
        <div className="text-sm mb-2">Scroll to explore</div>
        <div className="text-2xl">↓</div>
      </motion.div>
    </div>
  );
}
