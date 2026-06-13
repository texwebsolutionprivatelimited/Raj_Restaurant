import React, { useEffect, useState } from "react";
import { Calendar, Users, Trash2, CheckCircle, XCircle, Loader2, RefreshCw, Phone, Mail, BedDouble, Search } from "lucide-react";

export default function AdminRoomBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  // Format date properly
  const formatDate = (dateStr) => {
    if (!dateStr) return "-";
    if (typeof dateStr === "string") return dateStr;
    return new Date(dateStr).toISOString().split('T')[0];
  };

  const fetchBookings = async () => {
    setLoading(true);
    setError("");
    
    try {
      const token = localStorage.getItem("adminToken");
      
      if (!token) {
        setError("Admin not logged in");
        setLoading(false);
        return;
      }

      const res = await fetch("http://localhost:3000/api/room-bookings", {
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
      });

      if (!res.ok) {
        throw new Error("Failed to fetch bookings");
      }

      const data = await res.json();
      setBookings(data || []);
    } catch (err) {
      console.error(err);
      setError(err.message);
      
      // Fallback sample data
      setBookings([
        { 
          _id: "1", 
          name: "Rahul Sharma", 
          email: "rahul@gmail.com", 
          phone: "+91 9876543210", 
          roomType: "Deluxe Room", 
          checkIn: "2024-01-20", 
          checkOut: "2024-01-22", 
          guests: 2, 
          request: "Late check-in",
          status: "Confirmed" 
        },
        { 
          _id: "2", 
          name: "Priya Singh", 
          email: "priya@gmail.com", 
          phone: "+91 9876543211", 
          roomType: "Premium Suite", 
          checkIn: "2024-01-25", 
          checkOut: "2024-01-27", 
          guests: 3, 
          request: "",
          status: "Pending" 
        },
        { 
          _id: "3", 
          name: "Amit Verma", 
          email: "amit@gmail.com", 
          phone: "+91 9876543212", 
          roomType: "Royal Suite", 
          checkIn: "2024-01-28", 
          checkOut: "2024-01-30", 
          guests: 4, 
          request: "Need early check-in",
          status: "Pending" 
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // Filter bookings
  const filteredBookings = bookings.filter((b) => {
    const matchesSearch = 
      b.name?.toLowerCase().includes(search.toLowerCase()) ||
      b.phone?.includes(search) ||
      b.roomType?.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = filterStatus ? b.status === filterStatus : true;
    return matchesSearch && matchesStatus;
  });

  // Stats
  const stats = {
    total: bookings.length,
    confirmed: bookings.filter(b => b.status === "Confirmed").length,
    pending: bookings.filter(b => b.status === "Pending").length,
    totalGuests: bookings.reduce((acc, b) => acc + (b.guests || 0), 0),
  };

  // Update Status
  const updateStatus = async (id, status) => {
    if (!window.confirm(`Mark as ${status}?`)) return;
    
    try {
      const token = localStorage.getItem("adminToken");
      
      const res = await fetch(
        `http://localhost:3000/api/room-bookings/${id}/status`,
        {
          method: "PUT",
          headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify({ status }),
        }
      );

      if (res.ok) {
        fetchBookings();
      } else {
        alert("Status update failed");
      }
    } catch (err) {
      alert("Status update failed");
    }
  };

  // Delete booking
  const deleteBooking = async (id) => {
    if (!window.confirm("Delete this booking?")) return;
    
    try {
      const token = localStorage.getItem("adminToken");
      
      const res = await fetch(
        `http://localhost:3000/api/room-bookings/${id}`,
        {
          method: "DELETE",
          headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
        }
      );

      if (res.ok) {
        fetchBookings();
      } else {
        alert("Delete failed");
      }
    } catch (err) {
      alert("Delete failed");
    }
  };

  // Status badge color
  const getStatusBadge = (status) => {
    switch (status) {
      case "Confirmed": return "bg-green-600/20 text-green-400 border-green-600";
      case "Cancelled": return "bg-red-600/20 text-red-400 border-red-600";
      case "Pending": return "bg-yellow-600/20 text-yellow-400 border-yellow-600";
      default: return "bg-zinc-600/20 text-zinc-400 border-zinc-600";
    }
  };

  if (loading) return (
    <div className="p-6 flex items-center justify-center min-h-[400px]">
      <Loader2 className="w-8 h-8 animate-spin text-red-600" />
    </div>
  );

  return (
    <div className="p-2 md:p-6 bg-black min-h-screen text-white">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Room Bookings</h1>
          <p className="text-zinc-500 text-sm mt-1">Manage hotel room reservations</p>
        </div>
        <button 
          onClick={fetchBookings}
          className="bg-zinc-800 px-4 py-2 rounded-lg hover:bg-zinc-700 flex items-center gap-2 text-sm"
        >
          <RefreshCw size={16} />
          <span className="hidden sm:inline">Refresh</span>
        </button>
      </div>

      {error && (
        <div className="bg-yellow-600/20 border border-yellow-600 text-yellow-400 p-3 rounded-xl mb-4 text-sm">
          {error}
        </div>
      )}

      {/* Stats Cards - Responsive Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-6">
        <div className="bg-zinc-900 rounded-xl p-4 border border-zinc-800">
          <p className="text-zinc-400 text-xs md:text-sm">Total Bookings</p>
          <p className="text-2xl font-bold mt-1">{stats.total}</p>
        </div>
        <div className="bg-zinc-900 rounded-xl p-4 border border-zinc-800">
          <p className="text-zinc-400 text-xs md:text-sm">Confirmed</p>
          <p className="text-2xl font-bold mt-1 text-green-400">{stats.confirmed}</p>
        </div>
        <div className="bg-zinc-900 rounded-xl p-4 border border-zinc-800">
          <p className="text-zinc-400 text-xs md:text-sm">Pending</p>
          <p className="text-2xl font-bold mt-1 text-yellow-400">{stats.pending}</p>
        </div>
        <div className="bg-zinc-900 rounded-xl p-4 border border-zinc-800">
          <p className="text-zinc-400 text-xs md:text-sm">Total Guests</p>
          <p className="text-2xl font-bold mt-1 text-indigo-400">{stats.totalGuests}</p>
        </div>
      </div>

      {/* Search & Filter - Responsive */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
          <input
            type="text"
            placeholder="Search by name, phone or room..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-700 rounded-xl py-2.5 md:py-3 pl-10 pr-4 text-white text-sm"
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-2.5 md:py-3 text-white text-sm"
        >
          <option value="">All Status</option>
          <option value="Pending">Pending</option>
          <option value="Confirmed">Confirmed</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>

      {/* Mobile Cards / Desktop Table */}
      <div className="bg-zinc-900 rounded-xl border border-zinc-800 overflow-hidden">
        {/* Desktop Table - Hidden on mobile */}
        <div className="hidden lg:block">
          <table className="w-full">
            <thead className="bg-zinc-800">
              <tr>
                <th className="px-4 py-3 text-left text-gray-400 font-medium text-sm">Guest</th>
                <th className="px-4 py-3 text-left text-gray-400 font-medium text-sm">Contact</th>
                <th className="px-4 py-3 text-left text-gray-400 font-medium text-sm">Room</th>
                <th className="px-4 py-3 text-left text-gray-400 font-medium text-sm">Check-In</th>
                <th className="px-4 py-3 text-left text-gray-400 font-medium text-sm">Check-Out</th>
                <th className="px-4 py-3 text-left text-gray-400 font-medium text-sm">Guests</th>
                <th className="px-4 py-3 text-left text-gray-400 font-medium text-sm">Status</th>
                <th className="px-4 py-3 text-left text-gray-400 font-medium text-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-4 py-8 text-center text-gray-400">
                    No bookings found
                  </td>
                </tr>
              ) : (
                filteredBookings.map((b) => (
                  <tr key={b._id} className="border-t border-zinc-800 hover:bg-zinc-800/50">
                    <td className="px-4 py-3">
                      <p className="font-medium text-white text-sm">{b.name}</p>
                      <p className="text-xs text-gray-400">{b.email}</p>
                    </td>
                    <td className="px-4 py-3 text-gray-300 text-sm">{b.phone}</td>
                    <td className="px-4 py-3">
                      <span className="text-red-500 font-medium text-sm">{b.roomType}</span>
                    </td>
                    <td className="px-4 py-3 text-gray-300 text-sm">{formatDate(b.checkIn)}</td>
                    <td className="px-4 py-3 text-gray-300 text-sm">{formatDate(b.checkOut)}</td>
                    <td className="px-4 py-3 text-gray-300 text-sm">{b.guests}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusBadge(b.status)}`}>
                        {b.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1">
                        {b.status === "Pending" && (
                          <button onClick={() => updateStatus(b._id, "Confirmed")} className="bg-green-600 px-2 py-1 rounded text-xs">Confirm</button>
                        )}
                        {b.status === "Confirmed" && (
                          <button onClick={() => updateStatus(b._id, "Cancelled")} className="bg-red-600 px-2 py-1 rounded text-xs">Cancel</button>
                        )}
                        <button onClick={() => deleteBooking(b._id)} className="bg-zinc-700 px-2 py-1 rounded text-xs">Delete</button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards - Visible on mobile only */}
        <div className="lg:hidden p-4 space-y-3">
          {filteredBookings.length === 0 ? (
            <p className="text-center text-gray-400 py-8">No bookings found</p>
          ) : (
            filteredBookings.map((b) => (
              <div key={b._id} className="bg-zinc-800 rounded-xl p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className="font-medium text-white">{b.name}</p>
                    <p className="text-xs text-gray-400">{b.email}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusBadge(b.status)}`}>
                    {b.status}
                  </span>
                </div>
                
                <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                  <div>
                    <p className="text-gray-400 text-xs">Room</p>
                    <p className="text-red-500 font-medium">{b.roomType}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs">Guests</p>
                    <p className="text-white">{b.guests}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs">Check-In</p>
                    <p className="text-white">{formatDate(b.checkIn)}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs">Check-Out</p>
                    <p className="text-white">{formatDate(b.checkOut)}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 text-gray-400 text-xs mb-3">
                  <Phone size={12} />
                  {b.phone}
                </div>

                <div className="flex gap-2 flex-wrap">
                  {b.status === "Pending" && (
                    <button onClick={() => updateStatus(b._id, "Confirmed")} className="flex-1 bg-green-600 py-2 rounded-lg text-xs font-medium">Confirm</button>
                  )}
                  {b.status === "Confirmed" && (
                    <button onClick={() => updateStatus(b._id, "Cancelled")} className="flex-1 bg-red-600 py-2 rounded-lg text-xs font-medium">Cancel</button>
                  )}
                  <button onClick={() => deleteBooking(b._id)} className="flex-1 bg-zinc-700 py-2 rounded-lg text-xs font-medium">Delete</button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}