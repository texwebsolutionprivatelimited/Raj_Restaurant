import { Routes, Route, Navigate } from "react-router-dom";
import AdminLayout from "./adminLayout/AdminLayout";
import Dashboard from "./adminPages/Dashboard";
import Orders from "./adminPages/Orders";
import Bookings from "./adminPages/Bookings";
import Customers from "./adminPages/Customers";
import Settings from "./adminPages/Settings";
import Inventory from "./adminPages/Inventory";
import Payments from "./adminPages/Payments";
import Offers from "./adminPages/Offers";
import Categories from "./adminPages/Categories"

export default function AdminRoutes() {
  return (
    <Routes>
      {/* Redirect /admin to /admin/dashboard */}
      <Route path="/" element={<Navigate to="/admin" replace />} />
      
      {/* Admin Layout with all child routes */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="orders" element={<Orders />} />
        <Route path="bookings" element={<Bookings />} />
        <Route path="customers" element={<Customers />} />
        <Route path="inventory" element={<Inventory />} />
        <Route path="categories" element={<Categories />} />
        <Route path="payments" element={<Payments />} />
        <Route path="offers" element={<Offers />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}