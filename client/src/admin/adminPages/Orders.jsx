import { useState, useEffect } from "react";
import {
  Search,
  Phone,
  Mail,
  MapPin,
  Clock,
  ChefHat,
  CheckCircle,
  XCircle,
  Truck,
  Package,
  Eye,
} from "lucide-react";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  // FETCH ORDERS
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("adminToken");

        const response = await fetch(
          "http://localhost:3000/api/admin/orders",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        const safeData = Array.isArray(data)
          ? data
          : data.orders || [];

        setOrders(safeData);
      } catch (error) {
        console.error("Fetch error:", error);
        setOrders([]);
      }
    };

    fetchOrders();
  }, []);

  // FILTER ORDERS
  const filteredOrders = Array.isArray(orders)
    ? orders.filter((order) => {
        const searchTerm = search.toLowerCase();

        const matchesSearch =
          !search ||
          order.orderId?.toLowerCase()?.includes(searchTerm) ||
          order.customer?.name?.toLowerCase()?.includes(searchTerm) ||
          (order.customer?.phone + "")?.includes(search);

        const matchesStatus = filterStatus
          ? order.status === filterStatus
          : true;

        return matchesSearch && matchesStatus;
      })
    : [];

  // SAFE ORDERS
  const safeOrders = Array.isArray(orders) ? orders : [];

  // STATS
  const total = safeOrders.length;
  const delivered = safeOrders.filter(
    (o) => o.status === "Delivered"
  ).length;
  const preparing = safeOrders.filter(
    (o) => o.status === "Preparing"
  ).length;
  const pending = safeOrders.filter(
    (o) => o.status === "Pending"
  ).length;

  const totalRevenue = safeOrders
    .filter(
      (o) => o.status === "Delivered" && o.payment === "Paid"
    )
    .reduce((acc, o) => {
      const amt = Number(
        String(o.amount).replace(/[^\d]/g, "")
      );
      return acc + (amt || 0);
    }, 0);

  const stats = [
    { label: "Total Orders", value: total },
    { label: "Delivered", value: delivered, color: "text-green-400" },
    { label: "Preparing", value: preparing, color: "text-yellow-400" },
    { label: "Pending", value: pending, color: "text-orange-400" },
    {
      label: "Revenue",
      value: `₹${totalRevenue}`,
      color: "text-indigo-400",
    },
  ];

  // STATUS UI
  const getStatusBadge = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-green-500/10 text-green-400 border-green-500/20";
      case "Preparing":
        return "bg-yellow-500/10 text-yellow-400 border-yellow-500/20";
      case "Pending":
        return "bg-orange-500/10 text-orange-400 border-orange-500/20";
      case "Out for Delivery":
        return "bg-blue-500/10 text-blue-400 border-blue-500/20";
      case "Cancelled":
        return "bg-red-500/10 text-red-400 border-red-500/20";
      default:
        return "bg-zinc-500/10 text-zinc-400 border-zinc-500/20";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Delivered":
        return <CheckCircle size={16} />;
      case "Preparing":
        return <ChefHat size={16} />;
      case "Out for Delivery":
        return <Truck size={16} />;
      case "Cancelled":
        return <XCircle size={16} />;
      default:
        return <Clock size={16} />;
    }
  };

  // UPDATE STATUS
  const handleStatusChange = async (id, newStatus) => {
    try {
      const token = localStorage.getItem("adminToken");

      const response = await fetch(
        `http://localhost:3000/api/admin/orders/${id}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      const updatedOrder = await response.json();

      setOrders((prev) =>
        prev.map((order) =>
          order._id === id ? updatedOrder : order
        )
      );

      if (selectedOrder?._id === id) {
        setSelectedOrder(updatedOrder);
      }
    } catch (err) {
      console.error(err);
    }
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
            key={s.label}
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
                    key={order._id}
                    className="border-t border-white/5 hover:bg-white/5 transition"
                  >
                    <td className="p-4">
                      <span className="font-medium text-indigo-400">{order.orderId}</span>
                    </td>
                    <td className="p-4">
                      <div>
                        <p className="font-medium">{order.customer?.name}</p>
                        <p className="text-xs text-zinc-500">{order.customer?.phone}</p>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="text-zinc-300 space-y-1">
                        {Array.isArray(order.items) && order.items.length > 0 ? (
                          order.items.map((i, idx) => (
                            <div key={idx}>
                              🍽️ {i.name} <span className="text-zinc-500">x{i.qty}</span>
                            </div>
                          ))
                        ) : (
                          <span className="text-zinc-500">No items</span>
                        )}
                      </div>
                    </td>
                    <td className="p-4 font-semibold">₹{order.amount}</td>
                    <td className="p-4">
                      <span className={`text-xs px-2 py-1 rounded-full border ${order.payment === "Paid"
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
                            onClick={() => handleStatusChange(order._id, "Preparing")}
                            className="px-3 py-1 text-xs bg-green-500/10 text-green-400 border border-green-500/20 rounded-lg hover:bg-green-500/20 transition"
                          >
                            Start
                          </button>
                        )}
                        {order.status === "Preparing" && (
                          <button
                            onClick={() => handleStatusChange(order._id, "Out for Delivery")}
                            className="px-3 py-1 text-xs bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-lg hover:bg-blue-500/20 transition"
                          >
                            Dispatch
                          </button>
                        )}
                        {(order.status === "Out for Delivery" || order.status === "Preparing") && (
                          <button
                            onClick={() => handleStatusChange(order._id, "Delivered")}
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
                  <p className="text-xl font-semibold text-indigo-400">{selectedOrder.orderId}</p>
                </div>
                <span className={`px-3 py-1 text-sm rounded-full border ${getStatusBadge(selectedOrder.status)}`}>
                  {selectedOrder.status}
                </span>
              </div>

              {/* Customer Info */}
              <div>
                <p className="text-zinc-400 text-sm">Customer</p>
                <div className="flex items-center gap-2 mt-1">
                  <p className="font-medium">
                    {selectedOrder.customer?.name}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-zinc-400 text-sm">Email</p>
                  <div className="flex items-center gap-2">
                    <Mail size={14} />
                    {selectedOrder.customer?.email}
                  </div>
                </div>
                <div>
                  <p className="text-zinc-400 text-sm">Phone</p>
                  <div className="flex items-center gap-2">
                    <Phone size={14} />
                    {selectedOrder.customer?.phone}
                  </div>
                </div>
              </div>

              {/* Address */}
              <div>
                <p className="text-zinc-400 text-sm">Delivery Address</p>
                <div className="flex items-center gap-2">
                  <MapPin size={14} />
                  {selectedOrder.customer?.address}
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
                  {selectedOrder.items?.map((item, index) => (
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
                    className={`inline-flex mt-1 px-3 py-1 text-xs rounded-full border ${selectedOrder.payment === "Paid"
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
                            selectedOrder._id,
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
                            selectedOrder._id,
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
                            selectedOrder._id,
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
                            selectedOrder._id,
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