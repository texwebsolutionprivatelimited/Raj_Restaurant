import React from "react";
import { Link } from "react-router-dom";
import {
  QrCode,
  Smartphone,
  UtensilsCrossed,
  CreditCard,
} from "lucide-react";

export default function QROrderSection() {
  return (
    <section
      id="qr-order"
      className="py-24 px-4 bg-gradient-to-b from-black via-[#120909] to-black"
    >
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-16">
          <p className="uppercase tracking-[8px] text-red-500 text-sm font-semibold mb-4">
            Smart Dining Experience
          </p>

          <h2 className="text-4xl md:text-6xl font-bold text-white">
            QR Order &
            <span className="text-red-500"> Table Booking</span>
          </h2>

          <p className="text-gray-400 text-lg max-w-3xl mx-auto mt-6">
            Skip the wait and enjoy a modern dining experience.
            Scan, order and enjoy your favorite meals with ease.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Left Side */}
          <div className="space-y-6">

            <div className="bg-zinc-900 border border-red-600/20 rounded-3xl p-6">
              <div className="flex gap-4">
                <QrCode className="text-red-500 w-10 h-10" />

                <div>
                  <h3 className="text-white text-xl font-semibold">
                    Scan QR Code
                  </h3>

                  <p className="text-gray-400 mt-2">
                    Scan the QR code available at your table.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-zinc-900 border border-red-600/20 rounded-3xl p-6">
              <div className="flex gap-4">
                <Smartphone className="text-red-500 w-10 h-10" />

                <div>
                  <h3 className="text-white text-xl font-semibold">
                    Browse Menu
                  </h3>

                  <p className="text-gray-400 mt-2">
                    Explore dishes, prices and recommendations instantly.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-zinc-900 border border-red-600/20 rounded-3xl p-6">
              <div className="flex gap-4">
                <UtensilsCrossed className="text-red-500 w-10 h-10" />

                <div>
                  <h3 className="text-white text-xl font-semibold">
                    Place Order
                  </h3>

                  <p className="text-gray-400 mt-2">
                    Add items to cart and place your order directly.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-zinc-900 border border-red-600/20 rounded-3xl p-6">
              <div className="flex gap-4">
                <CreditCard className="text-red-500 w-10 h-10" />

                <div>
                  <h3 className="text-white text-xl font-semibold">
                    Quick Payment
                  </h3>

                  <p className="text-gray-400 mt-2">
                    Fast checkout and hassle-free dining experience.
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Side */}
          <div className="relative">

            <div className="bg-gradient-to-br from-red-950/20 to-black border border-red-600/20 rounded-[40px] p-10 text-center">

              <div className="w-52 h-52 mx-auto rounded-3xl bg-zinc-900 border border-red-600/20 flex items-center justify-center mb-8">
                <QrCode className="w-28 h-28 text-red-500" />
              </div>

              <h3 className="text-white text-3xl font-bold mb-4">
                Contactless Dining
              </h3>

              <p className="text-gray-400 mb-8">
                Experience seamless ordering with our smart QR system.
                No waiting, no hassle — just great food.
              </p>

              <Link
                to="/menu"
                className="inline-block bg-red-600 hover:bg-red-700 transition px-8 py-4 rounded-xl text-white font-semibold"
              >
                Start Ordering
              </Link>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}