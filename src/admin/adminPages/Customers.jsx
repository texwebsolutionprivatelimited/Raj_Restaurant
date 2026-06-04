import { useState, useEffect } from "react";
import { Search, Phone, Mail, MapPin, Calendar, Wallet, ShoppingBag, Star, X, Eye, Award } from "lucide-react";

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  useEffect(() => {
    setCustomers([
      { id: 1, name: "Rahul Sharma", email: "rahul@gmail.com", phone: "+91 9876543210", orders: 5, totalSpent: 4250, joined: "2023-06-15", status: "Regular", address: "123, MG Road, Delhi", points: 250 },
      { id: 2, name: "Priya Singh", email: "priya@gmail.com", phone: "+91 9876543211", orders: 3, totalSpent: 2100, joined: "2023-08-20", status: "Regular", address: "456, Sector 15, Noida", points: 120 },
      { id: 3, name: "Amit Verma", email: "amit@gmail.com", phone: "+91 9876543212", orders: 7, totalSpent: 5600, joined: "2023-03-10", status: "Premium", address: "789, Andheri, Mumbai", points: 560 },
      { id: 4, name: "Sita Devi", email: "sita@gmail.com", phone: "+91 9876543213", orders: 2, totalSpent: 950, joined: "2023-11-05", status: "New", address: "101, JP Nagar, Bangalore", points: 50 },
      { id: 5, name: "John Doe", email: "john@gmail.com", phone: "+91 9876543214", orders: 10, totalSpent: 8900, joined: "2023-01-01", status: "VIP", address: "202, Cyber City, Gurgaon", points: 890 },
      { id: 6, name: "Ravi Kumar", email: "ravi@gmail.com", phone: "+91 9876543215", orders: 4, totalSpent: 3200, joined: "2023-09-12", status: "Regular", address: "303, Salt Lake, Kolkata", points: 180 },
      { id: 7, name: "Anjali Reddy", email: "anjali@gmail.com", phone: "+91 9876543216", orders: 8, totalSpent: 7200, joined: "2023-04-18", status: "Premium", address: "404, Banjara Hills, Hyderabad", points: 720 },
      { id: 8, name: "Vikram Patel", email: "vikram@gmail.com", phone: "+91 9876543217", orders: 1, totalSpent: 450, joined: "2024-01-10", status: "New", address: "505, Navrangpura, Ahmedabad", points: 25 },
    ]);
  }, []);

  // Filter customers
  const filteredCustomers = customers.filter((c) => {
    const matchesSearch = 
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.phone.includes(search);
    const matchesStatus = filterStatus ? c.status === filterStatus : true;
    
    return matchesSearch && matchesStatus;
  });

  const totalCustomers = customers.length;
  const totalRevenue = customers.reduce((acc, c) => acc + c.totalSpent, 0);
  const totalOrders = customers.reduce((acc, c) => acc + c.orders, 0);
  const avgSpent = totalRevenue / totalCustomers;

  const stats = [
    { label: "Total Customers", value: totalCustomers, icon: <ShoppingBag size={18} /> },
    { label: "Total Revenue", value: `₹${totalRevenue.toLocaleString()}`, icon: <Wallet size={18} />, color: "text-green-400" },
    { label: "Total Orders", value: totalOrders, icon: <ShoppingBag size={18} /> },
    { label: "Avg. Spent", value: `₹${avgSpent.toLocaleString()}`, icon: <Star size={18} />, color: "text-yellow-400" },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "VIP": return "bg-purple-500/10 text-purple-400 border-purple-500/20";
      case "Premium": return "bg-yellow-500/10 text-yellow-400 border-yellow-500/20";
      case "Regular": return "bg-indigo-500/10 text-indigo-400 border-indigo-500/20";
      default: return "bg-green-500/10 text-green-400 border-green-500/20";
    }
  };

  const handleViewDetails = (customer) => {
    setSelectedCustomer(customer);
    setShowModal(true);
  };

  return (
    <div className="mt-2 px-2 md:px-0">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-4xl font-semibold">
          Customers
        </h1>
        <p className="text-zinc-500 text-sm mt-1">
          Manage your restaurant customers
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((s, i) => (
          <div
            key={i}
            className="bg-zinc-900/60 border border-white/10 rounded-2xl p-5 hover:scale-[1.02] transition"
          >
            <p className="text-zinc-400 text-sm flex items-center gap-2">
              {s.icon}
              {s.label}
            </p>
            <p className={`text-2xl font-semibold mt-1 ${s.color || "text-white"}`}>
              {s.value}
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
            placeholder="Search by name, email or phone..."
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
          <option value="VIP">VIP</option>
          <option value="Premium">Premium</option>
          <option value="Regular">Regular</option>
          <option value="New">New</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-zinc-900/60 border border-white/10 rounded-2xl overflow-hidden">

        {/* Table Header */}
        <div className="p-5 border-b border-white/10">
          <h2 className="text-lg font-medium">Customer List</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">

            <thead>
              <tr className="text-left text-zinc-400 text-sm">
                <th className="p-4">Customer</th>
                <th className="p-4">Contact</th>
                <th className="p-4">Orders</th>
                <th className="p-4">Total Spent</th>
                <th className="p-4">Status</th>
                <th className="p-4">Joined</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredCustomers.length > 0 ? (
                filteredCustomers.map((c) => (
                  <tr
                    key={c.id}
                    className="border-t border-white/5 hover:bg-white/5 transition"
                  >
                    <td className="p-4">
                      <div>
                        <p className="font-medium">{c.name}</p>
                        <p className="text-xs text-zinc-500">{c.email}</p>
                      </div>
                    </td>
                    <td className="p-4 text-zinc-400">
                      <div className="flex items-center gap-2">
                        <Phone size={14} />
                        {c.phone}
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="text-white font-medium">{c.orders}</span>
                    </td>
                    <td className="p-4 font-semibold text-green-400">
                      ₹{c.totalSpent.toLocaleString()}
                    </td>
                    <td className="p-4">
                      <span className={`px-3 py-1 text-xs rounded-full border ${getStatusColor(c.status)}`}>
                        {c.status}
                      </span>
                    </td>
                    <td className="p-4 text-zinc-400">{c.joined}</td>
                    <td className="p-4">
                      <button
                        onClick={() => handleViewDetails(c)}
                        className="px-3 py-1 text-xs bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-lg hover:bg-indigo-500/20 transition flex items-center gap-1"
                      >
                        <Eye size={14} />
                        View
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center py-10 text-zinc-500">
                    No customers found
                  </td>
                </tr>
              )}
            </tbody>

          </table>
        </div>
      </div>

      {/* Modal - Customer Details */}
      {showModal && selectedCustomer && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-lg flex items-center justify-center z-50 p-4">
          <div className="bg-zinc-900/90 backdrop-blur-xl w-full max-w-lg rounded-2xl p-6 border border-white/10 shadow-2xl">
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-xl font-semibold">Customer Details</h2>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 hover:bg-zinc-800 rounded-lg transition"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              {/* Avatar & Name */}
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-indigo-500/20 rounded-full flex items-center justify-center text-indigo-400 text-2xl font-bold">
                  {selectedCustomer.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-xl font-semibold">{selectedCustomer.name}</h3>
                  <span className={`px-3 py-1 text-xs rounded-full border ${getStatusColor(selectedCustomer.status)}`}>
                    {selectedCustomer.status}
                  </span>
                </div>
              </div>

              {/* Contact Info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-zinc-400 text-sm">Email</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Mail size={14} />
                    {selectedCustomer.email}
                  </div>
                </div>
                <div>
                  <p className="text-zinc-400 text-sm">Phone</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Phone size={14} />
                    {selectedCustomer.phone}
                  </div>
                </div>
              </div>

              {/* Address */}
              <div>
                <p className="text-zinc-400 text-sm">Address</p>
                <div className="flex items-center gap-2 mt-1">
                  <MapPin size={14} />
                  {selectedCustomer.address}
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-zinc-400 text-sm">Total Orders</p>
                  <p className="text-xl font-semibold">{selectedCustomer.orders}</p>
                </div>
                <div>
                  <p className="text-zinc-400 text-sm">Total Spent</p>
                  <p className="text-xl font-semibold text-green-400">₹{selectedCustomer.totalSpent.toLocaleString()}</p>
                </div>
              </div>

              {/* Loyalty Points */}
              <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-xl p-4">
                <div className="flex items-center gap-2">
                  <Award className="text-indigo-400" size={20} />
                  <span className="text-indigo-400 font-medium">Loyalty Points</span>
                </div>
                <p className="text-2xl font-semibold mt-1">{selectedCustomer.points} points</p>
              </div>

              {/* Joined Date */}
              <div>
                <p className="text-zinc-400 text-sm">Member Since</p>
                <div className="flex items-center gap-2 mt-1">
                  <Calendar size={14} />
                  {selectedCustomer.joined}
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-xl transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}