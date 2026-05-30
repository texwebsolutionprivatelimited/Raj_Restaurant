'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { CheckCircle2, Clock, MapPin, Phone } from 'lucide-react'
import { Header } from '@/components/header'

export default function OrderSuccessPage() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get('orderId') || 'RAJ-ORDER-001'

  const estimatedTime = Math.floor(Math.random() * 30) + 20 // 20-50 minutes

  return (
    <>
      <Header />
      <div className="min-h-screen bg-black pt-32 pb-20 px-4">
        <div className="max-w-xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <div className="w-28 h-28 mx-auto mb-8 rounded-full border-4 border-green-500 flex items-center justify-center">
              <CheckCircle2 className="w-16 h-16 text-green-500" />
            </div>
            <CheckCircle2 className="w-full h-full text-green-600" />
          </motion.div>

          <h1 className="text-4xl font-bold text-white mb-4">Order Confirmed!</h1>
          <p className="text-gray-400 text-lg">Thank you for your order</p>


          {/* Order Details Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-gray-900 to-black border border-green-600/30 rounded-lg p-8 space-y-8 mb-8"
          >
            {/* Order ID */}
            <div className="text-center py-6 border-b border-gray-700">
              <p className="text-gray-400 mb-2">Order ID</p>
              <p className="text-3xl font-bold text-green-600 font-mono">{orderId}</p>
            </div>

            {/* Delivery Info */}
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="bg-gray-900 rounded-lg p-4">
                <h3 className="text-white font-bold mb-2">
                  Payment Method
                </h3>

                <p className="text-green-500">
                  {orderId?.startsWith('COD')
                    ? 'Cash On Delivery'
                    : 'Paid via Razorpay'}
                </p>
              </div>
              {/* Estimated Time */}
              <motion.div whileHover={{ y: -5 }} className="bg-gray-900 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-3">
                  <Clock className="w-6 h-6 text-blue-500" />
                  <h3 className="text-white font-bold">Estimated Delivery</h3>
                </div>
                <p className="text-2xl font-bold text-white">{estimatedTime} mins</p>
                <p className="text-gray-400 text-sm mt-1">Your order is being prepared</p>
              </motion.div>

              {/* Tracking */}
              <motion.div whileHover={{ y: -5 }} className="bg-gray-900 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-3">
                  <MapPin className="w-6 h-6 text-red-500" />
                  <h3 className="text-white font-bold">Track Order</h3>
                </div>
                <p className="text-white">Status: <span className="text-green-600 font-bold">Preparing</span></p>
                <p className="text-gray-400 text-sm mt-1">You&apos;ll receive updates via SMS</p>
              </motion.div>
            </div>

            {/* What Happens Next */}
            <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
              <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                <Phone className="w-5 h-5 text-yellow-500" />
                What Happens Next?
              </h3>
              <ol className="text-gray-400 space-y-2 text-sm">
                <li>✓ Your order has been confirmed by the restaurant</li>
                <li>→ Chef is preparing your delicious meal</li>
                <li>→ Our delivery partner will collect your order</li>
                <li>→ You&apos;ll receive real-time tracking updates</li>
                <li>→ Enjoy your meal when it arrives!</li>
              </ol>
            </div>

            {/* Contact Support */}
            <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
              <p className="text-gray-400 text-sm">
                Need help? Contact us at <span className="text-red-500 font-bold">+91-9999-999-999</span> or email{' '}
                <span className="text-red-500 font-bold">support@rajrestaurant.com</span>
              </p>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/menu"
              className="flex-1 text-center bg-gradient-to-r from-red-600 to-red-700 text-white py-3 rounded-lg font-bold hover:shadow-lg hover:shadow-red-600/50 transition"
            >
              Continue Shopping
            </Link>
            <Link
              href="/"
              className="flex-1 text-center bg-gray-800 text-white py-3 rounded-lg font-bold hover:bg-gray-700 transition"
            >
              Back to Home
            </Link>
          </div>

          {/* Safety Note */}
          <p className="text-gray-500 text-xs text-center mt-8">
            🔒 Your order information is secure and encrypted. We never share your details with third parties.
          </p>
        </div>
      </div>
    </>
  )
}
