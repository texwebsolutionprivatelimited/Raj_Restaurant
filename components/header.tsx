'use client'

import Image from 'next/image'
import Link from 'next/link'

import {
  useState,
  useEffect,
} from 'react'

import {
  Menu,
  X,
  ShoppingCart,
} from 'lucide-react'

import { useCartStore } from '@/lib/cart-store'

export function Header() {

  const [menuOpen, setMenuOpen] =
    useState(false)

  // Fix Hydration Error
  const [mounted, setMounted] =
    useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Cart Count
  const totalItems = useCartStore(
    (state) => state.getTotalItems()
  )

  // Login State
  const isLoggedIn =
    mounted &&
    typeof window !== 'undefined' &&
    localStorage.getItem('isLoggedIn')

  // Logout Function
  const handleLogout = () => {

    localStorage.removeItem('isLoggedIn')

    window.location.reload()
  }

  return (

    <header className="fixed top-0 left-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-gray-800">

      <div className="max-w-7xl mx-auto px-4">

        <div className="flex items-center justify-between h-24">

          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3"
          >

            <Image
              src="/logo.webp"
              alt="Raj Restaurant"
              width={75}
              height={75}
              className="object-contain"
              priority
            />

            <div>

              <h1 className="text-3xl font-bold text-white">
                Raj Restaurant
              </h1>

              <p className="text-xs text-red-500 tracking-wide">
                Flavors That Feel Like Home
              </p>
            </div>
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center gap-8">

            <Link
              href="/"
              className="text-gray-300 hover:text-red-500 transition"
            >
              Home
            </Link>

            <Link
              href="/menu"
              className="text-gray-300 hover:text-red-500 transition"
            >
              Menu
            </Link>

            <Link
              href="/contact"
              className="text-gray-300 hover:text-red-500 transition"
            >
              Contact
            </Link>

            <Link
              href="/bookings"
              className="text-gray-300 hover:text-red-500 transition"
            >
              Book Table
            </Link>
          </nav>

          {/* Right Side */}
          <div className="flex items-center gap-4">

            {/* Cart */}
            <Link
              href="/cart"
              className="relative text-white hover:text-red-500 transition"
            >

              <ShoppingCart size={26} />

              {/* Cart Count */}
              {mounted && totalItems > 0 && (

                <span className="absolute -top-2 -right-2 bg-red-600 text-xs text-white min-w-[20px] h-5 px-1 rounded-full flex items-center justify-center font-semibold">

                {totalItems > 99 ? '99+' : totalItems}
                </span>
              )}
            </Link>

            {/* Auth Buttons */}
            {!isLoggedIn ? (

              <>
                {/* Login */}
                <Link
                  href="/auth/login"
                  className="hidden md:inline-block text-white hover:text-red-500 transition font-medium"
                >
                  Login
                </Link>

                {/* Signup */}
                <Link
                  href="/auth/signup"
                  className="hidden md:inline-block bg-red-600 hover:bg-red-700 transition px-5 py-2 rounded-lg text-white font-semibold"
                >
                  Sign Up
                </Link>
              </>

            ) : (

              <button
                onClick={handleLogout}
                className="hidden md:inline-block bg-red-600 hover:bg-red-700 transition px-5 py-2 rounded-lg text-white font-semibold"
              >
                Logout
              </button>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() =>
                setMenuOpen(!menuOpen)
              }
              className="md:hidden text-white"
            >

              {menuOpen ? (
                <X size={28} />
              ) : (
                <Menu size={28} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (

          <div className="md:hidden pb-6 border-t border-gray-800 pt-5">

            <nav className="flex flex-col gap-4">

              <Link
                href="/"
                className="text-gray-300 hover:text-red-500 transition"
              >
                Home
              </Link>

              <Link
                href="/menu"
                className="text-gray-300 hover:text-red-500 transition"
              >
                Menu
              </Link>

              <Link
                href="/contact"
                className="text-gray-300 hover:text-red-500 transition"
              >
                Contact
              </Link>

              <Link
                href="/bookings"
                className="text-gray-300 hover:text-red-500 transition"
              >
                Book Table
              </Link>

              {!isLoggedIn ? (

                <>
                  <Link
                    href="/auth/login"
                    className="border border-red-600 text-red-500 hover:bg-red-600/10 transition px-5 py-3 rounded-lg font-semibold text-center"
                  >
                    Login
                  </Link>

                  <Link
                    href="/auth/signup"
                    className="bg-red-600 hover:bg-red-700 transition px-5 py-3 rounded-lg text-white font-semibold text-center"
                  >
                    Sign Up
                  </Link>
                </>

              ) : (

                <button
                  onClick={handleLogout}
                  className="bg-red-600 hover:bg-red-700 transition px-5 py-3 rounded-lg text-white font-semibold"
                >
                  Logout
                </button>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}