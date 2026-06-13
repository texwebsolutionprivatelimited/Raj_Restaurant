import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";

import RoomBookingPage from "./pages/room-booking";
import ScrollToTop from "./components/ScrollToTop";
import EventBooking from "./pages/event-booking";

import { CartProvider } from "./context/cart-context";
import "./globals.css";
import ProtectedRoute from "./components/ProtectedRoute";

// User Pages
import Home from "./pages/home.jsx";
import BookingsPage from "./pages/bookings.jsx";
import CartPage from "./pages/cart.jsx";
import CheckoutPage from "./pages/checkout.jsx";
import ContactPage from "./pages/contact.jsx";
import MenuPage from "./pages/menu.jsx";
import OrderSuccessPage from "./pages/order-success.jsx";
import QrOrderPage from "./pages/qr-order.jsx";
import LoginPage from "./pages/login.jsx";
import SignupPage from "./pages/signup.jsx";

// Admin Pages
import AdminLayout from "./admin/adminLayout/AdminLayout";
import Dashboard from "./admin/adminPages/Dashboard.jsx";
import Orders from "./admin/adminPages/Orders.jsx";
import Bookings from "./admin/adminPages/Bookings.jsx";
import Customers from "./admin/adminPages/Customers.jsx";
import Settings from "./admin/adminPages/Settings.jsx";
import Inventory from "./admin/adminPages/Inventory.jsx";
import Categories from "./admin/adminPages/Categories";
import Payments from "./admin/adminPages/Payments.jsx";
import Offers from "./admin/adminPages/Offers.jsx";
import AdminRoomBookings from "./admin/adminPages/AdminRoomBookings";

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <ScrollToTop />

        <Routes>
          {/* User Routes */}
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
          <Route path="/event-booking" element={<EventBooking />} />
          <Route path="/room-booking" element={<RoomBookingPage />} />

          {/* Admin Routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="orders" element={<Orders />} />
            <Route path="bookings" element={<Bookings />} />
            <Route path="roombookings" element={<AdminRoomBookings />} />
            <Route path="customers" element={<Customers />} />
            <Route path="settings" element={<Settings />} />
            <Route path="inventory" element={<Inventory />} />
            <Route path="categories" element={<Categories />} />
            <Route path="payments" element={<Payments />} />
            <Route path="offers" element={<Offers />} />
          </Route>
        </Routes>

        <Toaster position="top-right" theme="dark" />
      </CartProvider>
    </BrowserRouter>
  );
}