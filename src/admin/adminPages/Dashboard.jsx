import {
    ShoppingBag,
    Calendar,
    Users,
    IndianRupee,
    TrendingUp,
    TrendingDown,
    ArrowRight,
    Package,
    UtensilsCrossed,
    Wallet,
    CheckCircle,
    XCircle,
    Clock,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
    const navigate = useNavigate();
    const [showFoodModal, setShowFoodModal] = useState(false);
    const [showBookingModal, setShowBookingModal] = useState(false);
    const [timeFilter, setTimeFilter] = useState("today");

    const [foodItem, setFoodItem] = useState({
        name: "",
        category: "",
        price: "",
    });

    // Sample data
    const [recentOrders, setRecentOrders] = useState([
        { id: "#ORD001", customer: "Rahul Sharma", items: "Butter Chicken, Roti", amount: 850, status: "Delivered", time: "2 min ago" },
        { id: "#ORD002", customer: "Priya Singh", items: "Paneer Biryani", amount: 650, status: "Preparing", time: "5 min ago" },
        { id: "#ORD003", customer: "Amit Verma", items: "Chicken Biryani, Salad", amount: 1200, status: "Pending", time: "10 min ago" },
        { id: "#ORD004", customer: "Sita Devi", items: "Dal Makhani, Rice", amount: 450, status: "Delivered", time: "15 min ago" },
        { id: "#ORD005", customer: "John Doe", items: "Full Thali", amount: 350, status: "Preparing", time: "20 min ago" },
    ]);

    const [reservations, setReservations] = useState([
        { id: 1, name: "Rohit Kumar", guests: 4, date: "Today", time: "7:00 PM", status: "Confirmed" },
        { id: 2, name: "Priya Singh", guests: 2, date: "Today", time: "8:00 PM", status: "Confirmed" },
        { id: 3, name: "Vikas Sharma", guests: 8, date: "Tomorrow", time: "7:30 PM", status: "Pending" },
        { id: 4, name: "Anjali Reddy", guests: 6, date: "Tomorrow", time: "9:00 PM", status: "Confirmed" },
    ]);

    const stats = [
        { 
            title: "Total Orders", 
            value: "245", 
            change: "+12%",
            changeType: "positive",
            icon: <ShoppingBag size={20} />,
        },
        { 
            title: "Total Revenue", 
            value: "₹1,25,000", 
            change: "+8%",
            changeType: "positive",
            icon: <IndianRupee size={20} />,
            color: "text-green-400",
        },
        { 
            title: "Event Bookings", 
            value: "18", 
            change: "-5%",
            changeType: "negative",
            icon: <Calendar size={20} />,
        },
        { 
            title: "Active Users", 
            value: "42", 
            change: "+15%",
            changeType: "positive",
            icon: <Users size={20} />,
        },
    ];

    // Chart data (simplified bar representation)
    const weeklyData = [
        { day: "Mon", orders: 45, revenue: 12000 },
        { day: "Tue", orders: 52, revenue: 15000 },
        { day: "Wed", orders: 38, revenue: 10000 },
        { day: "Thu", orders: 65, revenue: 18000 },
        { day: "Fri", orders: 78, revenue: 22000 },
        { day: "Sat", orders: 92, revenue: 25000 },
        { day: "Sun", orders: 85, revenue: 23000 },
    ];

    const maxOrders = Math.max(...weeklyData.map(d => d.orders));

    const handleStatusChange = (id, newStatus) => {
        setRecentOrders(recentOrders.map(order => 
            order.id === id ? { ...order, status: newStatus } : order
        ));
    };

    const getStatusColor = (status) => {
        switch (status) {
            case "Delivered": return "text-green-400";
            case "Preparing": return "text-yellow-400";
            case "Pending": return "text-red-400";
            default: return "text-zinc-400";
        }
    };

    const getStatusBadge = (status) => {
        switch (status) {
            case "Delivered": return "bg-green-500/10 text-green-400 border-green-500/20";
            case "Preparing": return "bg-yellow-500/10 text-yellow-400 border-yellow-500/20";
            case "Pending": return "bg-red-500/10 text-red-400 border-red-500/20";
            case "Confirmed": return "bg-green-500/10 text-green-400 border-green-500/20";
            default: return "bg-yellow-500/10 text-yellow-400 border-yellow-500/20";
        }
    };

    return (
        <div className="w-full">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-10 gap-4">
                <div>
                    <h1 className="text-3xl md:text-4xl font-bold">
                        Dashboard Overview
                    </h1>
                    <p className="text-zinc-500 mt-2">
                        Welcome back, Admin! Here's what's happening today.
                    </p>
                </div>

                <div className="flex gap-2">
                    <select 
                        value={timeFilter}
                        onChange={(e) => setTimeFilter(e.target.value)}
                        className="bg-zinc-900 border border-white/10 rounded-xl px-4 py-2 text-sm outline-none"
                    >
                        <option value="today">Today</option>
                        <option value="week">This Week</option>
                        <option value="month">This Month</option>
                    </select>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
                {stats.map((item, index) => (
                    <div
                        key={index}
                        className="bg-zinc-900 border border-white/10 rounded-2xl p-6 hover:scale-[1.02] transition"
                    >
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-zinc-400 text-sm">
                                    {item.title}
                                </p>
                                <h2 className="text-3xl font-bold mt-2">
                                    {item.value}
                                </h2>
                                <div className={`flex items-center gap-1 mt-2 text-sm ${
                                    item.changeType === "positive" ? "text-green-400" : "text-red-400"
                                }`}>
                                    {item.changeType === "positive" ? (
                                        <TrendingUp size={14} />
                                    ) : (
                                        <TrendingDown size={14} />
                                    )}
                                    {item.change} from last week
                                </div>
                            </div>
                            <div className={`p-3 rounded-xl ${
                                item.color || "bg-indigo-500/10 text-indigo-400"
                            }`}>
                                {item.icon}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
                {/* Weekly Chart */}
                <div className="lg:col-span-2 bg-zinc-900 border border-white/10 rounded-2xl p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-semibold">Weekly Orders</h2>
                        <span className="text-zinc-400 text-sm">Last 7 days</span>
                    </div>
                    
                    <div className="flex items-end justify-between gap-2 h-48">
                        {weeklyData.map((data, index) => (
                            <div key={index} className="flex-1 flex flex-col items-center gap-2">
                                <div 
                                    className="w-full bg-indigo-500 rounded-t-lg transition-all hover:bg-indigo-400"
                                    style={{ height: `${(data.orders / maxOrders) * 100}%` }}
                                >
                                    <span className="text-xs text-white block text-center pt-1">
                                        {data.orders}
                                    </span>
                                </div>
                                <span className="text-xs text-zinc-400">{data.day}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quick Stats */}
                <div className="bg-zinc-900 border border-white/10 rounded-2xl p-6">
                    <h2 className="text-xl font-semibold mb-5">
                        Today's Highlights
                    </h2>
                    
                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-3 bg-zinc-800/50 rounded-xl">
                            <div className="flex items-center gap-3">
                                <UtensilsCrossed className="text-indigo-400" size={20} />
                                <div>
                                    <p className="font-medium">Orders</p>
                                    <p className="text-xs text-zinc-400">In progress</p>
                                </div>
                            </div>
                            <span className="text-2xl font-bold text-indigo-400">12</span>
                        </div>

                        <div className="flex items-center justify-between p-3 bg-zinc-800/50 rounded-xl">
                            <div className="flex items-center gap-3">
                                <Wallet className="text-green-400" size={20} />
                                <div>
                                    <p className="font-medium">Revenue</p>
                                    <p className="text-xs text-zinc-400">Today</p>
                                </div>
                            </div>
                            <span className="text-2xl font-bold text-green-400">₹8,500</span>
                        </div>

                        <div className="flex items-center justify-between p-3 bg-zinc-800/50 rounded-xl">
                            <div className="flex items-center gap-3">
                                <Users className="text-yellow-400" size={20} />
                                <div>
                                    <p className="font-medium">Guests</p>
                                    <p className="text-xs text-zinc-400">Dining in</p>
                                </div>
                            </div>
                            <span className="text-2xl font-bold text-yellow-400">24</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
                {/* Recent Orders */}
                <div className="bg-zinc-900 border border-white/10 rounded-2xl overflow-hidden">
                    <div className="p-5 border-b border-white/10 flex justify-between items-center">
                        <h2 className="text-xl font-semibold">Recent Orders</h2>
                        <button 
                            onClick={() => navigate("/admin/orders")}
                            className="text-indigo-400 text-sm flex items-center gap-1 hover:text-indigo-300"
                        >
                            View All <ArrowRight size={14} />
                        </button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="text-left text-zinc-400 text-sm">
                                    <th className="p-4">Order ID</th>
                                    <th className="p-4">Customer</th>
                                    <th className="p-4">Amount</th>
                                    <th className="p-4">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentOrders.map((order) => (
                                    <tr key={order.id} className="border-t border-white/5 hover:bg-white/5 transition">
                                        <td className="p-4">
                                            <span className="text-indigo-400 font-medium">{order.id}</span>
                                        </td>
                                        <td className="p-4">
                                            <div>
                                                <p className="font-medium">{order.customer}</p>
                                                <p className="text-xs text-zinc-500">{order.items}</p>
                                            </div>
                                        </td>
                                        <td className="p-4 font-semibold">₹{order.amount}</td>
                                        <td className="p-4">
                                            <div className="flex items-center gap-2">
                                                <span className={`px-3 py-1 text-xs rounded-full border ${getStatusBadge(order.status)}`}>
                                                    {order.status}
                                                </span>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Reservations */}
                <div className="bg-zinc-900 border border-white/10 rounded-2xl p-6">
                    <div className="flex justify-between items-center mb-5">
                        <h2 className="text-xl font-semibold">Upcoming Reservations</h2>
                        <button 
                            onClick={() => navigate("/admin/bookings")}
                            className="text-indigo-400 text-sm flex items-center gap-1 hover:text-indigo-300"
                        >
                            View All <ArrowRight size={14} />
                        </button>
                    </div>

                    <div className="space-y-3">
                        {reservations.map((res) => (
                            <div key={res.id} className="flex items-center justify-between p-4 bg-zinc-800/50 rounded-xl hover:bg-zinc-800 transition">
                                <div>
                                    <p className="font-medium">{res.name}</p>
                                    <p className="text-sm text-zinc-400">{res.guests} guests • {res.time}</p>
                                </div>
                                <span className={`px-3 py-1 text-xs rounded-full border ${getStatusBadge(res.status)}`}>
                                    {res.status}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-zinc-900 border border-white/10 rounded-2xl p-6">
                <h2 className="text-xl font-semibold mb-5">
                    Quick Actions
                </h2>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <button
                        onClick={() => setShowFoodModal(true)}
                        className="bg-indigo-600 hover:bg-indigo-700 py-4 rounded-xl flex flex-col items-center gap-2 transition"
                    >
                        <UtensilsCrossed size={24} />
                        <span className="text-sm">Add Food</span>
                    </button>

                    <button
                        onClick={() => navigate("/admin/inventory")}
                        className="bg-zinc-800 hover:bg-zinc-700 py-4 rounded-xl flex flex-col items-center gap-2 transition"
                    >
                        <Package size={24} />
                        <span className="text-sm">Inventory</span>
                    </button>
                    
                    <button
                        onClick={() => setShowBookingModal(true)}
                        className="bg-zinc-800 hover:bg-zinc-700 py-4 rounded-xl flex flex-col items-center gap-2 transition"
                    >
                        <Calendar size={24} />
                        <span className="text-sm">Booking</span>
                    </button>

                    <button
                        onClick={() => navigate("/admin/offers")}
                        className="bg-zinc-800 hover:bg-zinc-700 py-4 rounded-xl flex flex-col items-center gap-2 transition"
                    >
                        <Users size={24} />
                        <span className="text-sm">Offers</span>
                    </button>
                </div>
            </div>

            {/* Add Food Modal */}
            {showFoodModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                    <div className="bg-zinc-900 p-6 rounded-2xl w-full max-w-md border border-white/10">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold">Add Food Item</h2>
                            <button 
                                onClick={() => setShowFoodModal(false)}
                                className="p-2 hover:bg-zinc-800 rounded-lg"
                            >
                                <XCircle size={20} />
                            </button>
                        </div>

                        <input
                            type="text"
                            placeholder="Food Name"
                            value={foodItem.name}
                            onChange={(e) => setFoodItem({ ...foodItem, name: e.target.value })}
                            className="w-full bg-zinc-800 rounded-xl px-4 py-3 mb-3 outline-none focus:ring-2 focus:ring-indigo-500"
                        />

                        <select
                            value={foodItem.category}
                            onChange={(e) => setFoodItem({ ...foodItem, category: e.target.value })}
                            className="w-full bg-zinc-800 rounded-xl px-4 py-3 mb-3 outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            <option value="">Select Category</option>
                            <option value="Starters">Starters</option>
                            <option value="Main Course">Main Course</option>
                            <option value="Desserts">Desserts</option>
                        </select>

                                                <input
                            type="number"
                            placeholder="Price"
                            value={foodItem.price}
                            onChange={(e) =>
                                setFoodItem({
                                    ...foodItem,
                                    price: e.target.value,
                                })
                            }
                            className="w-full bg-zinc-800 rounded-xl px-4 py-3 mb-4 outline-none focus:ring-2 focus:ring-indigo-500"
                        />

                        <div className="flex gap-3">
                            <button
                                onClick={() => {
                                    if (
                                        !foodItem.name ||
                                        !foodItem.category ||
                                        !foodItem.price
                                    ) {
                                        alert("Please fill all fields");
                                        return;
                                    }

                                    alert("Food Item Added Successfully!");

                                    setFoodItem({
                                        name: "",
                                        category: "",
                                        price: "",
                                    });

                                    setShowFoodModal(false);
                                }}
                                className="flex-1 bg-indigo-600 hover:bg-indigo-700 py-3 rounded-xl transition font-medium"
                            >
                                Add Food
                            </button>

                            <button
                                onClick={() => setShowFoodModal(false)}
                                className="flex-1 bg-zinc-800 hover:bg-zinc-700 py-3 rounded-xl transition"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Booking Modal */}
            {showBookingModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                    <div className="bg-zinc-900 p-6 rounded-2xl w-full max-w-md border border-white/10">
                        <div className="flex justify-between items-center mb-5">
                            <h2 className="text-xl font-semibold">
                                New Booking
                            </h2>

                            <button
                                onClick={() =>
                                    setShowBookingModal(false)
                                }
                                className="p-2 hover:bg-zinc-800 rounded-lg"
                            >
                                <XCircle size={20} />
                            </button>
                        </div>

                        <div className="space-y-4">
                            <input
                                type="text"
                                placeholder="Customer Name"
                                className="w-full bg-zinc-800 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
                            />

                            <input
                                type="number"
                                placeholder="Number of Guests"
                                className="w-full bg-zinc-800 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
                            />

                            <input
                                type="date"
                                className="w-full bg-zinc-800 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
                            />

                            <input
                                type="time"
                                className="w-full bg-zinc-800 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
                            />

                            <div className="flex gap-3 pt-2">
                                <button
                                    onClick={() => {
                                        alert(
                                            "Booking Created Successfully!"
                                        );
                                        setShowBookingModal(false);
                                    }}
                                    className="flex-1 bg-indigo-600 hover:bg-indigo-700 py-3 rounded-xl transition"
                                >
                                    Create Booking
                                </button>

                                <button
                                    onClick={() =>
                                        setShowBookingModal(false)
                                    }
                                    className="flex-1 bg-zinc-800 hover:bg-zinc-700 py-3 rounded-xl transition"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}