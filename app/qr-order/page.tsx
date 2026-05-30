'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { QrCode, CheckCircle } from 'lucide-react'
import { Header } from '@/components/header'

export default function QROrderPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const tableId = searchParams.get('table') || 'N/A'

  return (
    <>
      <Header />
      <Header />
<main className="min-h-screen bg-gradient-to-br from-black via-red-900/10 to-black pt-32 pb-20 px-4">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-br from-gray-900 to-black border border-red-600/30 rounded-2xl p-8 md:p-12 text-center"
          >
            {/* QR Icon */}
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{
                duration: 2,
                repeat: Infinity
              }}
              className="flex justify-center mb-8"
            >
              <div className="relative">
                <QrCode className="w-24 h-24 text-red-600" />
                <CheckCircle className="absolute -bottom-2 -right-2 w-8 h-8 text-green-500 bg-black rounded-full border-2 border-black" />
              </div>
            </motion.div>

            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Welcome to Table {tableId}</h1>
            <p className="text-gray-400 mb-8 text-lg">
              You&apos;ve scanned the QR code successfully. Start ordering your favorite dishes now!
            </p>

            {/* Table Info */}
            <div className="bg-red-600/10 border border-red-600/30 rounded-lg p-6 mb-8">
              <p className="text-gray-300 mb-2">Table Number</p>
              <p className="text-3xl font-bold text-red-600">#{tableId}</p>
            </div>

            {/* Info Points */}
            <div className="space-y-4 mb-8 text-left bg-gray-900/50 rounded-lg p-6 border border-gray-800">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white font-bold">
                  1
                </div>
                <div>
                  <p className="text-white font-semibold">Browse the Menu</p>
                  <p className="text-gray-400 text-sm">Select from our wide variety of dishes</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white font-bold">
                  2
                </div>
                <div>
                  <p className="text-white font-semibold">Add to Cart</p>
                  <p className="text-gray-400 text-sm">Choose quantity and add items to your cart</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white font-bold">
                  3
                </div>
                <div>
                  <p className="text-white font-semibold">Checkout</p>
                  <p className="text-gray-400 text-sm">Review your order and proceed to payment</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white font-bold">
                  4
                </div>
                <div>
                  <p className="text-white font-semibold">Order Confirmed</p>
                  <p className="text-gray-400 text-sm">Food will be delivered to your table</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid sm:grid-cols-2 gap-4">
              <button
                onClick={() => router.push(`/menu?table=${tableId}`)}
                className="bg-gradient-to-r from-red-600 to-red-700 text-white py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-red-600/50 transition transform hover:scale-105"
              >
                Start Ordering
              </button>
              <button
                onClick={() => router.back()}
                className="border-2 border-red-600 text-red-600 py-3 rounded-lg font-semibold hover:bg-red-600/10 transition"
              >
                Go Back
              </button>
            </div>

            {/* Table Notes */}
            <div className="mt-8 pt-8 border-t border-gray-700">
              <p className="text-gray-400 text-sm">
                Your table number ({tableId}) will help our staff identify your orders. Please have it ready for payment.
              </p>
            </div>
          </motion.div>
        </div>
      </main>
    </>
  )
}
