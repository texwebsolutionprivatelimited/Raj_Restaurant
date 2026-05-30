'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { MessageSquareHeart } from 'lucide-react'

export default function FeedbackCTA() {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-gray-950 to-black">
      <div className="max-w-5xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gray-900/40 border border-gray-800 rounded-3xl p-10 md:p-14 text-center"
        >

          {/* Icon */}
          <div className="w-20 h-20 rounded-full bg-red-600/20 flex items-center justify-center mx-auto mb-8">
            <MessageSquareHeart className="w-10 h-10 text-red-500" />
          </div>

          {/* Heading */}
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-5">
            Share Your Experience
          </h2>

          {/* Description */}
          <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed mb-8">
            Loved your meal? Tell us about your experience,
            upload food photos, report issues, and help us
            improve our service.
          </p>

          {/* Features */}
          <div className="flex flex-wrap justify-center gap-4 mb-10">

            <span className="bg-black border border-gray-700 text-gray-300 px-5 py-2 rounded-full text-sm">
              ⭐ Ratings & Reviews
            </span>

            <span className="bg-black border border-gray-700 text-gray-300 px-5 py-2 rounded-full text-sm">
              📸 Upload Food Photos
            </span>

            <span className="bg-black border border-gray-700 text-gray-300 px-5 py-2 rounded-full text-sm">
              💬 Share Suggestions
            </span>
          </div>

          {/* Button */}
          <Link
            href="/contact"
            className="inline-block bg-red-600 hover:bg-red-700 transition px-8 py-4 rounded-xl text-white font-semibold text-lg"
          >
            Give Feedback
          </Link>

          {/* Small Note */}
          <p className="text-gray-500 text-sm mt-6">
            Only highly rated customer reviews are featured publicly.
          </p>
        </motion.div>
      </div>
    </section>
  )
}