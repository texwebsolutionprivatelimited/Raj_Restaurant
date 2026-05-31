"use client";

import Link from "next/link";

import {
  Facebook,
  Instagram,
  Twitter,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";

export default function FooterSection() {
  return (
    <footer className="border-t border-gray-800 bg-black mt-24">
      <div className="max-w-7xl mx-auto px-6 py-14">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <h2 className="text-3xl font-bold text-white mb-5">
              Raj Restaurant
            </h2>

            <p className="text-gray-400 leading-relaxed mb-6">
              Authentic Indian cuisine crafted with premium ingredients, rich
              flavors, and unforgettable dining experiences.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-4">
              <a
                href="#"
                className="w-11 h-11 rounded-full bg-gray-900 flex items-center justify-center text-gray-300 hover:bg-red-600 hover:text-white transition duration-300"
              >
                <Facebook size={18} />
              </a>

              <a
                href="#"
                className="w-11 h-11 rounded-full bg-gray-900 flex items-center justify-center text-gray-300 hover:bg-red-600 hover:text-white transition duration-300"
              >
                <Instagram size={18} />
              </a>

              <a
                href="#"
                className="w-11 h-11 rounded-full bg-gray-900 flex items-center justify-center text-gray-300 hover:bg-red-600 hover:text-white transition duration-300"
              >
                <Twitter size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-5">
              Quick Links
            </h3>

            <ul className="space-y-4 text-gray-400">
              <li>
                <Link href="/" className="hover:text-red-500 transition">
                  Home
                </Link>
              </li>

              <li>
                <Link href="/menu" className="hover:text-red-500 transition">
                  Menu
                </Link>
              </li>

              <li>
                <Link
                  href="/bookings"
                  className="hover:text-red-500 transition"
                >
                  Book Table
                </Link>
              </li>

              <li>
                <Link href="/contact" className="hover:text-red-500 transition">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-5">Contact</h3>

            <div className="space-y-5 text-gray-400">
              <div className="flex items-center gap-3">
                <Phone className="text-red-500" size={18} />

                <p>+91 98765 43210</p>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="text-red-500" size={18} />

                <p>support@rajrestaurant.com</p>
              </div>

              <div className="flex items-center gap-3">
                <MapPin className="text-red-500" size={18} />

                <p>Bhopal, Madhya Pradesh</p>
              </div>
            </div>
          </div>

          {/* Opening Hours */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-5">
              Opening Hours
            </h3>

            <div className="space-y-4 text-gray-400">
              <div>
                <p>Monday - Friday</p>

                <p className="text-white font-medium mt-1">
                  10:00 AM - 11:00 PM
                </p>
              </div>

              <div>
                <p>Saturday - Sunday</p>

                <p className="text-white font-medium mt-1">
                  9:00 AM - 12:00 AM
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 mt-14 pt-8 flex flex-col md:flex-row items-center justify-between gap-5">
          <p className="text-gray-500 text-sm text-center md:text-left">
            © 2026 Raj Restaurant. All Rights Reserved.
          </p>

          <div className="flex items-center gap-6 text-sm text-gray-500">
            <Link href="#" className="hover:text-red-500 transition">
              Privacy Policy
            </Link>

            <Link href="#" className="hover:text-red-500 transition">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
