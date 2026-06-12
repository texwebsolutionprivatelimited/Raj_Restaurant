"use client";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Cake,
  Heart,
  Building2,
  Users,
  Sparkles,
  PartyPopper,
} from "lucide-react";

const events = [
  {
    title: "Birthday Parties",
    icon: Cake,
    description:
      "Celebrate unforgettable birthdays with delicious food, decorations, and a vibrant atmosphere.",
  },
  {
    title: "Anniversary Celebrations",
    icon: Heart,
    description:
      "Create beautiful memories with your loved ones in a romantic dining setup.",
  },
  {
    title: "Corporate Events",
    icon: Building2,
    description:
      "Professional dining spaces and catering services for meetings and corporate gatherings.",
  },
  {
    title: "Family Gatherings",
    icon: Users,
    description:
      "Bring the whole family together for special occasions and festive celebrations.",
  },
  {
    title: "Engagement Ceremonies",
    icon: Sparkles,
    description:
      "Elegant arrangements and premium hospitality for your special day.",
  },
  {
    title: "Wedding Functions",
    icon: PartyPopper,
    description:
      "Grand celebrations with customized menus and exceptional service.",
  },
];

export default function TrendingSection() {
  return (<section className="py-24 px-4 bg-black"> <div className="max-w-7xl mx-auto">

    ```
    {/* Heading */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-center mb-16"
    >
      <p className="uppercase tracking-[8px] text-red-500 text-sm font-semibold mb-4">
        Celebrate With Us
      </p>

      <h2 className="text-4xl md:text-6xl font-bold text-white">
        Events &
        <span className="text-red-500"> Parties</span>
      </h2>

      <p className="text-gray-400 mt-6 text-lg max-w-3xl mx-auto">
        From birthdays and anniversaries to corporate events and wedding
        functions, Raj Restaurant offers the perfect venue, exceptional
        cuisine, and memorable experiences.
      </p>
    </motion.div>

    {/* Event Cards */}
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {events.map((event, index) => {
        const Icon = event.icon;

        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group bg-gradient-to-br from-zinc-900 to-black border border-zinc-800 hover:border-red-600 rounded-3xl p-8 transition-all duration-300"
          >
            <div className="w-16 h-16 rounded-2xl bg-red-600/15 flex items-center justify-center mb-6 group-hover:bg-red-600 transition">
              <Icon className="w-8 h-8 text-red-500 group-hover:text-white" />
            </div>

            <h3 className="text-2xl font-bold text-white mb-4">
              {event.title}
            </h3>

            <p className="text-gray-400 leading-7">
              {event.description}
            </p>

            <Link
              to="/event-booking"
              className="inline-block bg-red-600 hover:bg-red-700 px-6 py-3 rounded-xl text-white font-semibold"
            >
              Book This Event
            </Link>
          </motion.div>
        );
      })}
    </div>

    {/* CTA */}


  </div>
  </section>
  );
}