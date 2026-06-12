import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import RoomBookingPage from "./pages/room-booking";
import ScrollToTop from "./components/ScrollToTop";
import EventBooking from "./pages/event-booking";
import { CartProvider } from "@/src/context/cart-context";
import "@/src/globals.css";
import ProtectedRoute from "@/src/components/ProtectedRoute";

// User Pages
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

// Admin Pages - Add ALL these
import AdminLayout from "@/src/admin/adminLayout/AdminLayout";
import Dashboard from "@/src/admin/adminPages/Dashboard.jsx";
import Orders from "@/src/admin/adminPages/Orders.jsx";
import Bookings from "@/src/admin/adminPages/Bookings.jsx";
import Customers from "@/src/admin/adminPages/Customers.jsx";
import Settings from "@/src/admin/adminPages/Settings.jsx";
import Inventory from "@/src/admin/adminPages/Inventory.jsx";
import Categories from "@/src/admin/adminPages/Categories";
import Payments from "@/src/admin/adminPages/Payments.jsx";
import Offers from "@/src/admin/adminPages/Offers.jsx";
import AdminRoomBookings from "./admin/adminPages/AdminRoomBookings";
export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
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

          {/* Admin Routes - ADD THESE */}
          <Route path="/admin" element={<ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>}>

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