import { useState, useEffect } from "react";
import { Search, Plus, Phone, Mail, MapPin, Clock, Users, Calendar, CheckCircle, XCircle, AlertCircle } from "lucide-react";

export default function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  const handleStatusChange = async (id, newStatus) => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch(
        `http://localhost:3000/api/admin/event-bookings/${id}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            status: newStatus,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update status");
      }

      setBookings((prev) =>
        prev.map((booking) =>
          booking._id === id
            ? data
            : booking
        )
      );

      if (selectedBooking?._id === id) {
        setSelectedBooking(data);
      }

      alert("Booking confirmed successfully!");

      if (selectedBooking?._id === id) {
        setSelectedBooking(updatedBooking);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Filter bookings
  const filteredBookings = Array.isArray(bookings)
    ? bookings.filter((b) => {
      const searchTerm = search.toLowerCase();

      const matchesSearch =
        !search ||
        b.name?.toLowerCase()?.includes(searchTerm) ||
        b.eventType?.toLowerCase()?.includes(searchTerm) ||
        b.phone?.includes(search);

      const matchesStatus =
        filterStatus
          ? b.status === filterStatus
          : true;

      return matchesSearch && matchesStatus;
    })
    : [];

  const confirmed = Array.isArray(bookings)
    ? bookings.filter((b) => b.status === "Confirmed").length
    : 0;

  const pending = Array.isArray(bookings)
    ? bookings.filter((b) => b.status === "Pending").length
    : 0;

  const totalGuests = Array.isArray(bookings)
    ? bookings.reduce(
      (acc, b) => acc + Number(b.guests || 0),
      0
    )
    : 0;

  const upcoming = Array.isArray(bookings)
    ? bookings.filter(
      (b) =>
        b.date &&
        new Date(b.date) >= new Date()
    ).length
    : 0;

  const stats = [
    { label: "Total Bookings", value: bookings.length, icon: <Calendar size={18} /> },
    { label: "Confirmed", value: confirmed, color: "text-green-400", icon: <CheckCircle size={18} /> },
    { label: "Pending", value: pending, color: "text-yellow-400", icon: <AlertCircle size={18} /> },
    { label: "Total Guests", value: totalGuests, icon: <Users size={18} /> },
  ];

  const handleViewDetails = (booking) => {
    setSelectedBooking(booking);
    setShowModal(true);
  };

  useEffect(() => {
    let isMounted = true;

    const fetchBookings = async () => {
      const token = localStorage.getItem("adminToken");

      if (!token) return;

      const response = await fetch(
        "http://localhost:3000/api/admin/event-bookings",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (isMounted) {
        setBookings(Array.isArray(data) ? data : []);
      }
    };

    fetchBookings();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="mt-2 px-2 md:px-0">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl md:text-4xl font-semibold">
            Event Bookings
          </h1>
          <p className="text-zinc-500 text-sm mt-1">
            Manage all restaurant event bookings
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((item, i) => (
          <div
            key={i}
            className="bg-zinc-900/60 border border-white/10 rounded-2xl p-5 hover:scale-[1.02] transition"
          >
            <p className="text-zinc-400 text-sm flex items-center gap-2">
              {item.icon}
              {item.label}
            </p>
            <p className={`text-2xl font-semibold mt-1 ${item.color || "text-white"}`}>
              {item.value}
            </p>
          </div>
        ))}
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
            size={18}
          />
          <input
            type="text"
            placeholder="Search by customer, event or phone..."
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
          <option value="Confirmed">Confirmed</option>
          <option value="Pending">Pending</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-zinc-900/60 border border-white/10 rounded-2xl overflow-hidden">

        <div className="p-5 border-b border-white/10">
          <h2 className="text-lg font-medium">All Bookings</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead>
              <tr className="text-left text-zinc-400 text-sm">
                <th className="p-4">Event Type</th>
                <th className="p-4">Customer</th>
                <th className="p-4">Contact</th>
                <th className="p-4">Date</th>
                <th className="p-4">Guests</th>
                <th className="p-4">Message</th>
                <th className="p-4">Status</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredBookings.length > 0 ? (
                filteredBookings.map((b) => (
                  <tr
                    key={b._id}
                    className="border-t border-white/5 hover:bg-white/5 transition"
                  >
                    <td className="p-4 font-medium">{b.eventType}</td>
                    <td className="p-4">
                      <div>
                        <p className="font-medium">{b.name}</p>
                        <p className="text-xs text-zinc-500">{b.email}</p>
                      </div>
                    </td>
                    <td className="p-4 text-zinc-400">
                      <div className="flex items-center gap-2">
                        <Phone size={14} />
                        {b.phone}
                      </div>
                    </td>
                    <td className="p-4 text-zinc-400">
                      <div className="flex items-center gap-2">
                        <Calendar size={14} />
                        {new Date(b.date).toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <Clock size={14} />
                        {b.time}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <Users size={16} />
                        {b.guests}
                      </div>
                    </td>
                    <td className="p-4 text-zinc-400">
                      {b.message || "No special requests"}
                    </td>
                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium
                        ${b.status === "Confirmed"
                            ? "bg-green-500/10 text-green-400 border border-green-500/20"
                            : "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20"
                          }`}
                      >
                        {b.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleViewDetails(b)}
                          className="px-3 py-1 text-xs bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-lg hover:bg-indigo-500/20 transition"
                        >
                          View
                        </button>
                        {b.status === "Pending" && (
                          <button
                            onClick={() => handleStatusChange(b._id, "Confirmed")}
                            className="px-3 py-1 text-xs bg-green-500/10 text-green-400 border border-green-500/20 rounded-lg hover:bg-green-500/20 transition"
                          >
                            Confirm
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="p-8 text-center text-zinc-500">
                    No bookings found
                  </td>
                </tr>
              )}
            </tbody>

          </table>
        </div>
      </div>

      {/* Modal - Booking Details */}
      {showModal && selectedBooking && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-lg flex items-center justify-center z-50 p-4">
          <div className="bg-zinc-900/90 backdrop-blur-xl w-full max-w-lg rounded-2xl p-6 border border-white/10 shadow-2xl">
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-xl font-semibold">Booking Details</h2>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 hover:bg-zinc-800 rounded-lg transition"
              >
                <XCircle size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-zinc-400 text-sm">Event</p>
                  <p className="font-medium">{selectedBooking.eventType}</p>
                </div>
                <div>
                  <p className="text-zinc-400 text-sm">Status</p>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium
                    ${selectedBooking.status === "Confirmed"
                        ? "bg-green-500/10 text-green-400"
                        : "bg-yellow-500/10 text-yellow-400"
                      }`}
                  >
                    {selectedBooking.status}
                  </span>
                </div>
              </div>

              <div>
                <p className="text-zinc-400 text-sm">Customer Name</p>
                <p className="font-medium">{selectedBooking.name}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-zinc-400 text-sm">Email</p>
                  <div className="flex items-center gap-2">
                    <Mail size={14} />
                    {selectedBooking.email}
                  </div>
                </div>
                <div>
                  <p className="text-zinc-400 text-sm">Phone</p>
                  <div className="flex items-center gap-2">
                    <Phone size={14} />
                    {selectedBooking.phone}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-zinc-400 text-sm">Date & Time</p>
                  <div className="flex items-center gap-2">
                    <Calendar size={14} />
                    {new Date(selectedBooking.date).toLocaleDateString()}
                  </div>
                </div>
                <div>
                  <p className="text-zinc-400 text-sm">Guests</p>
                  <div className="flex items-center gap-2">
                    <Users size={14} />
                    {selectedBooking.guests}
                  </div>
                </div>
              </div>

              <div>
                <p className="text-zinc-400 text-sm">Venue</p>
                <div className="flex items-center gap-2">
                  <MapPin size={14} />
                  <span>
                    {selectedBooking.message || "No message"}
                  </span>
                </div>
              </div>

              <div>
                <p className="text-zinc-400 text-sm">Notes</p>
                <p className="text-zinc-300">{selectedBooking.message || "No special requests"}</p>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              {selectedBooking.status === "Pending" && (
                <>
                  <button
                    onClick={() => handleStatusChange(selectedBooking._id, "Confirmed")}
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-xl transition"
                  >
                    Confirm Booking
                  </button>
                  <button
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-xl transition"
                  >
                    Close
                  </button>
                </>
              )}
              {selectedBooking.status === "Confirmed" && (
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-xl transition"
                >
                  Close
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}