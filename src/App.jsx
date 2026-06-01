import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import { CartProvider } from "@/src/context/cart-context";
import "@/src/globals.css";

// Import all application page views
import Home from "@/src/pages/home.jsx";
import BookingsPage from "@/src/pages/bookings.jsx";
import CartPage from "@/src/pages/cart.jsx";
import CheckoutPage from "@/src/pages/checkout.jsx";
import ContactPage from "@/src/pages/contact.jsx";
import MenuPage from "@/src/pages/menu.jsx";
import OrderSuccessPage from "@/src/pages/order-success.jsx";
import QrOrderPage from "@/src/pages/qr-order.jsx";
import LoginPage from "@/src/pages/login.jsx";
import SignupPage from "@/src/pages/signup.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/bookings" element={<BookingsPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/order-success" element={<OrderSuccessPage />} />
          <Route path="/qr-order" element={<QrOrderPage />} />
          <Route path="/auth/login" element={<LoginPage />} />
          <Route path="/auth/signup" element={<SignupPage />} />
        </Routes>
        <Toaster position="top-right" theme="dark" />
      </CartProvider>
    </BrowserRouter>
  );
}
