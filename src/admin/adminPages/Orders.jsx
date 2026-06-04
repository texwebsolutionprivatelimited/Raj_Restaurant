import { useState, useEffect } from "react";
import { Search, Phone, Mail, MapPin, Clock, ChefHat, CheckCircle, XCircle, Truck, Package, Eye } from "lucide-react";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    setOrders([
      { id: "#ORD001", customer: "Rahul Sharma", email: "rahul@gmail.com", phone: "+91 9876543210", address: "123, MG Road, Delhi", items: [{ name: "Butter Chicken", qty: 1, price: 350 }, { name: "Roti", qty: 4, price: 120 }], amount: 850, status: "Delivered", payment: "Paid", date: "2024-01-15", time: "7:30 PM" },
      { id: "#ORD002", customer: "Priya Singh", email: "priya@gmail.com", phone: "+91 9876543211", address: "456, Sector 15, Noida", items: [{ name: "Paneer Biryani", qty: 1, price: 250 }, { name: "Raita", qty: 1, price: 80 }], amount: 650, status: "Preparing", payment: "Pending", date: "2024-01-15", time: "8:00 PM" },
      { id: "#ORD003", customer: "Amit Verma", email: "amit@gmail.com", phone: "+91 9876543212", address: "789, Andheri, Mumbai", items: [{ name: "Chicken Biryani", qty: 2, price: 600 }, { name: "Salad", qty: 1, price: 50 }], amount: 1200, status: "Pending", payment: "Pending", date: "2024-01-15", time: "8:30 PM" },
      { id: "#ORD004", customer: "Sita Devi", email: "sita@gmail.com", phone: "+91 9876543213", address: "101, JP Nagar, Bangalore", items: [{ name: "Dal Makhani", qty: 1, price: 200 }, { name: "Jeera Rice", qty: 1, price: 180 }], amount: 450, status: "Delivered", payment: "Paid", date: "2024-01-14", time: "7:00 PM" },
      { id: "#ORD005", customer: "John Doe", email: "john@gmail.com", phone: "+91 9876543214", address: "202, Cyber City, Gurgaon", items: [{ name: "Full Thali", qty: 2, price: 700 }], amount: 900, status: "Preparing", payment: "Paid", date: "2024-01-15", time: "9:00 PM" },
      { id: "#ORD006", customer: "Ravi Kumar", email: "ravi@gmail.com", phone: "+91 9876543215", address: "303, Salt Lake, Kolkata", items: [{ name: "Masala Dosa", qty: 2, price: 300 }, { name: "Coffee", qty: 2, price: 100 }], amount: 550, status: "Delivered", payment: "Paid", date: "2024-01-14", time: "6:30 PM" },
      { id: "#ORD007", customer: "Anjali Reddy", email: "anjali@gmail.com", phone: "+91 9876543216", address: "404, Banjara Hills, Hyderabad", items: [{ name: "Idli Sambar", qty: 3, price: 180 }, { name: "Vada", qty: 2, price: 80 }], amount: 380, status: "Cancelled", payment: "Refunded", date: "2024-01-14", time: "5:00 PM" },
      { id: "#ORD008", customer: "Vikram Patel", email: "vikram@gmail.com", phone: "+91 9876543217", address: "505, Navrangpura, Ahmedabad", items: [{ name: "Pav Bhaji", qty: 1, price: 200 }, { name: "Paneer Pakoda", qty: 1, price: 150 }], amount: 450, status: "Out for Delivery", payment: "Paid", date: "2024-01-15", time: "6:00 PM" },
    ]);
  }, []);

  // Filter orders
  const filteredOrders = orders.filter((order) => {
    const matchesSearch = 
      order.id.toLowerCase().includes(search.toLowerCase()) ||
      order.customer.toLowerCase().includes(search.toLowerCase()) ||
      order.phone.includes(search);
    const matchesStatus = filterStatus ? order.status === filterStatus : true;
    return matchesSearch && matchesStatus;
  });

  const total = orders.length;
  const delivered = orders.filter(o => o.status === "Delivered").length;
  const preparing = orders.filter(o => o.status === "Preparing").length;
  const pending = orders.filter(o => o.status === "Pending").length;
  const cancelled = orders.filter(o => o.status === "Cancelled").length;
  const totalRevenue = orders.filter(o => o.status === "Delivered" && o.payment === "Paid").reduce((acc, o) => acc + o.amount, 0);

  const stats = [
    { label: "Total Orders", value: total },
    { label: "Delivered", value: delivered, color: "text-green-400" },
    { label: "Preparing", value: preparing, color: "text-yellow-400" },
    { label: "Pending", value: pending, color: "text-orange-400" },
    { label: "Revenue", value: `₹${totalRevenue}`, color: "text-indigo-400" },
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case "Delivered": return "bg-green-500/10 text-green-400 border-green-500/20";
      case "Preparing": return "bg-yellow-500/10 text-yellow-400 border-yellow-500/20";
      case "Pending": return "bg-orange-500/10 text-orange-400 border-orange-500/20";
      case "Out for Delivery": return "bg-blue-500/10 text-blue-400 border-blue-500/20";
      case "Cancelled": return "bg-red-500/10 text-red-400 border-red-500/20";
      default: return "bg-zinc-500/10 text-zinc-400 border-zinc-500/20";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Delivered": return <CheckCircle size={16} />;
      case "Preparing": return <ChefHat size={16} />;
      case "Out for Delivery": return <Truck size={16} />;
      case "Cancelled": return <XCircle size={16} />;
      default: return <Clock size={16} />;
    }
  };

  const handleStatusChange = (id, newStatus) => {
    setOrders(orders.map(order => 
      order.id === id ? { ...order, status: newStatus } : order
    ));
  };

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  return (
    <div className="mt-2 px-2 md:px-0">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl md:text-4xl font-semibold">
            Orders
          </h1>
          <p className="text-zinc-500 text-sm mt-1">
            Track and manage all customer orders
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
        {stats.map((s, i) => (
          <div
            key={i}
            className="bg-zinc-900/60 border border-white/10 rounded-2xl p-5 hover:scale-[1.02] transition"
          >
            <p className="text-zinc-400 text-sm">{s.label}</p>
            <p className={`text-2xl font-semibold mt-1 ${s.color || "text-white"}`}>
              {s.value}
            </p>
          </div>
        ))}
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
            size={18}
          />
          <input
            type="text"
            placeholder="Search orders..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-zinc-900/60 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white outline-none focus:border-indigo-500 transition"
          />
        </div>

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="bg-zinc-900/60 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-indigo-500 transition"
        >
          <option value="">All Status</option>
          <option value="Pending">Pending</option>
          <option value="Preparing">Preparing</option>
          <option value="Out for Delivery">Out for Delivery</option>
          <option value="Delivered">Delivered</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-zinc-900/60 border border-white/10 rounded-2xl overflow-hidden">

        {/* Header */}
        <div className="p-5 border-b border-white/10">
          <h2 className="text-lg font-medium">All Orders</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px]">

            <thead>
              <tr className="text-left text-zinc-400 text-sm">
                <th className="p-4">Order ID</th>
                <th className="p-4">Customer</th>
                <th className="p-4">Items</th>
                <th className="p-4">Amount</th>
                <th className="p-4">Payment</th>
                <th className="p-4">Status</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="border-t border-white/5 hover:bg-white/5 transition"
                  >
                    <td className="p-4">
                      <span className="font-medium text-indigo-400">{order.id}</span>
                    </td>
                    <td className="p-4">
                      <div>
                        <p className="font-medium">{order.customer}</p>
                        <p className="text-xs text-zinc-500">{order.phone}</p>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="text-zinc-300">
                        {order.items.map(i => i.name).join(", ")}
                      </span>
                    </td>
                    <td className="p-4 font-semibold">₹{order.amount}</td>
                    <td className="p-4">
                      <span className={`text-xs px-2 py-1 rounded-full border ${
                        order.payment === "Paid" 
                          ? "bg-green-500/10 text-green-400 border-green-500/20"
                          : order.payment === "Pending"
                          ? "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
                          : "bg-red-500/10 text-red-400 border-red-500/20"
                      }`}>
                        {order.payment}
                      </span>
                    </td>

                    <td className="p-4">
                      <span className={`px-3 py-1 text-xs rounded-full border flex items-center gap-1 w-fit ${getStatusBadge(order.status)}`}>
                        {getStatusIcon(order.status)}
                        {order.status}
                      </span>
                    </td>

                    <td className="p-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleViewDetails(order)}
                          className="px-3 py-1 text-xs bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-lg hover:bg-indigo-500/20 transition flex items-center gap-1"
                        >
                          <Eye size={14} />
                          View
                        </button>
                        {order.status === "Pending" && (
                          <button
                            onClick={() => handleStatusChange(order.id, "Preparing")}
                            className="px-3 py-1 text-xs bg-green-500/10 text-green-400 border border-green-500/20 rounded-lg hover:bg-green-500/20 transition"
                          >
                            Start
                          </button>
                        )}
                        {order.status === "Preparing" && (
                          <button
                            onClick={() => handleStatusChange(order.id, "Out for Delivery")}
                            className="px-3 py-1 text-xs bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-lg hover:bg-blue-500/20 transition"
                          >
                            Dispatch
                          </button>
                        )}
                        {(order.status === "Out for Delivery" || order.status === "Preparing") && (
                          <button
                            onClick={() => handleStatusChange(order.id, "Delivered")}
                            className="px-3 py-1 text-xs bg-green-500/10 text-green-400 border border-green-500/20 rounded-lg hover:bg-green-500/20 transition"
                          >
                            Done
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-zinc-500">
                    No orders found
                  </td>
                </tr>
              )}
            </tbody>

          </table>
        </div>
      </div>

      {/* Modal - Order Details */}
      {showModal && selectedOrder && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-lg flex items-center justify-center z-50 p-4">
          <div className="bg-zinc-900/90 backdrop-blur-xl w-full max-w-lg rounded-2xl p-6 border border-white/10 shadow-2xl">
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-xl font-semibold">Order Details</h2>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 hover:bg-zinc-800 rounded-lg transition"
              >
                <XCircle size={20} />
              </button>
            </div>

            <div className="space-y-4">
              {/* Order ID & Status */}
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-zinc-400 text-sm">Order ID</p>
                  <p className="text-xl font-semibold text-indigo-400">{selectedOrder.id}</p>
                </div>
                <span className={`px-3 py-1 text-sm rounded-full border ${getStatusBadge(selectedOrder.status)}`}>
                  {selectedOrder.status}
                </span>
              </div>

              {/* Customer Info */}
              <div>
                <p className="text-zinc-400 text-sm">Customer</p>
                <div className="flex items-center gap-2 mt-1">
                  <p className="font-medium">{selectedOrder.customer}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-zinc-400 text-sm">Email</p>
                  <div className="flex items-center gap-2">
                    <Mail size={14} />
                    {selectedOrder.email}
                  </div>
                </div>
                <div>
                  <p className="text-zinc-400 text-sm">Phone</p>
                  <div className="flex items-center gap-2">
                    <Phone size={14} />
                    {selectedOrder.phone}
                  </div>
                </div>
              </div>

              {/* Address */}
              <div>
                <p className="text-zinc-400 text-sm">Delivery Address</p>
                <div className="flex items-center gap-2">
                  <MapPin size={14} />
                  {selectedOrder.address}
                </div>
              </div>

              {/* Date & Time */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-zinc-400 text-sm">Date</p>
                  <div className="flex items-center gap-2">
                    <Clock size={14} />
                    {selectedOrder.date}
                  </div>
                </div>
                <div>
                  <p className="text-zinc-400 text-sm">Time</p>
                  <div className="flex items-center gap-2">
                    <Clock size={14} />
                    {selectedOrder.time}
                  </div>
                </div>
              </div>

                            {/* Items */}
              <div>
                <p className="text-zinc-400 text-sm mb-2">Ordered Items</p>

                <div className="space-y-2">
                  {selectedOrder.items.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center bg-zinc-800/50 rounded-xl p-3"
                    >
                      <div className="flex items-center gap-2">
                        <Package size={16} className="text-indigo-400" />
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-xs text-zinc-500">
                            Qty: {item.qty}
                          </p>
                        </div>
                      </div>

                      <p className="font-semibold">
                        ₹{item.price}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Payment */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-zinc-400 text-sm">Payment Status</p>
                  <span
                    className={`inline-flex mt-1 px-3 py-1 text-xs rounded-full border ${
                      selectedOrder.payment === "Paid"
                        ? "bg-green-500/10 text-green-400 border-green-500/20"
                        : selectedOrder.payment === "Pending"
                        ? "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
                        : "bg-red-500/10 text-red-400 border-red-500/20"
                    }`}
                  >
                    {selectedOrder.payment}
                  </span>
                </div>

                <div>
                  <p className="text-zinc-400 text-sm">Total Amount</p>
                  <p className="text-2xl font-bold text-indigo-400">
                    ₹{selectedOrder.amount}
                  </p>
                </div>
              </div>

              {/* Status Actions */}
              {selectedOrder.status !== "Delivered" &&
                selectedOrder.status !== "Cancelled" && (
                  <div className="pt-4 border-t border-white/10">
                    <p className="text-zinc-400 text-sm mb-3">
                      Update Order Status
                    </p>

                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => {
                          handleStatusChange(
                            selectedOrder.id,
                            "Preparing"
                          );
                          setSelectedOrder({
                            ...selectedOrder,
                            status: "Preparing",
                          });
                        }}
                        className="px-4 py-2 rounded-xl bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 hover:bg-yellow-500/20 transition"
                      >
                        Preparing
                      </button>

                      <button
                        onClick={() => {
                          handleStatusChange(
                            selectedOrder.id,
                            "Out for Delivery"
                          );
                          setSelectedOrder({
                            ...selectedOrder,
                            status: "Out for Delivery",
                          });
                        }}
                        className="px-4 py-2 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20 hover:bg-blue-500/20 transition"
                      >
                        Out for Delivery
                      </button>

                      <button
                        onClick={() => {
                          handleStatusChange(
                            selectedOrder.id,
                            "Delivered"
                          );
                          setSelectedOrder({
                            ...selectedOrder,
                            status: "Delivered",
                          });
                        }}
                        className="px-4 py-2 rounded-xl bg-green-500/10 text-green-400 border border-green-500/20 hover:bg-green-500/20 transition"
                      >
                        Delivered
                      </button>

                      <button
                        onClick={() => {
                          handleStatusChange(
                            selectedOrder.id,
                            "Cancelled"
                          );
                          setSelectedOrder({
                            ...selectedOrder,
                            status: "Cancelled",
                          });
                        }}
                        className="px-4 py-2 rounded-xl bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 transition"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}

              {/* Footer */}
              <div className="flex justify-end pt-4 border-t border-white/10">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-5 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 transition"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}