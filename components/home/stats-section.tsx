'use client'

import { motion } from 'framer-motion'
import {
  Users,
  ShoppingBag,
  Star,
  ChefHat,
} from 'lucide-react'

const stats = [
  {
    icon: Users,
    number: '25K+',
    label: 'Happy Customers',
  },
  {
    icon: ShoppingBag,
    number: '50K+',
    label: 'Orders Delivered',
  },
  {
    icon: Star,
    number: '4.9',
    label: 'Customer Rating',
  },
  {
    icon: ChefHat,
    number: '15+',
    label: 'Expert Chefs',
  },
]

export default function StatsSection() {
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
            Trusted by Food Lovers
          </h2>

          <p className="text-gray-400 mt-4 text-lg max-w-2xl mx-auto">
            Delivering premium Indian cuisine with exceptional
            quality and unforgettable dining experiences.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

          {stats.map((item, index) => {
            const Icon = item.icon

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-900/40 border border-gray-800 rounded-2xl p-8 text-center hover:border-red-600/40 transition duration-300"
              >
                <div className="w-16 h-16 rounded-full bg-red-600/20 flex items-center justify-center mx-auto mb-6">
                  <Icon className="w-8 h-8 text-red-500" />
                </div>

                <h3 className="text-4xl font-bold text-white mb-3">
                  {item.number}
                </h3>

                <p className="text-gray-400 text-lg">
                  {item.label}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}