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
    XCircle,
} from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";

const API = "http://localhost:3000/api/admin";

export default function AdminDashboard() {
    const navigate = useNavigate();
    const [bookings, setBookings] = useState([]);
    const [showFoodModal, setShowFoodModal] = useState(false);
    const [showBookingModal, setShowBookingModal] = useState(false);
    const [timeFilter, setTimeFilter] = useState("today");
    const [messages, setMessages] = useState([]);
    const [roomBookings, setRoomBookings] = useState([]);
    const [eventBookings, setEventBookings] = useState([]);

    const [highlights, setHighlights] = useState({
        ordersInProgress: 0,
        todayRevenue: 0,
        diningGuests: 0,
    });

    const [weeklyData, setWeeklyData] = useState([
        { day: "Mon", orders: 0 },
        { day: "Tue", orders: 0 },
        { day: "Wed", orders: 0 },
        { day: "Thu", orders: 0 },
        { day: "Fri", orders: 0 },
        { day: "Sat", orders: 0 },
        { day: "Sun", orders: 0 },
    ]);

    const maxOrders = Math.max(...weeklyData.map((d) => d.orders));


    const [stats, setStats] = useState([
        { title: "Total Orders", value: 0, icon: <ShoppingBag size={20} />, changeType: "positive", change: "+0%" },
        { title: "Total Revenue", value: "₹0", icon: <IndianRupee size={20} />, changeType: "positive", change: "+0%" },
        { title: "Total Bookings", value: 0, icon: <Calendar size={20} />, changeType: "positive", change: "+0%" },
        { title: "Total Customers", value: 0, icon: <Users size={20} />, changeType: "positive", change: "+0%" },
    ]);

    const [orders, setOrders] = useState([]);
    const [foodItem, setFoodItem] = useState({ name: "", category: "", price: "" });
    const [recentOrders, setRecentOrders] = useState([]);
    const [reservations, setReservations] = useState([]);

    // --- AUTH HELPER (Moved to top) ---
    const getAuthHeader = () => {
        const auth = JSON.parse(
            localStorage.getItem("auth-storage") || "{}"
        );

        const token =
            localStorage.getItem("adminToken") ||
            auth?.state?.token;

        if (!token) {
            console.warn("No token found");
            return {};
        }

        return {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        };
    };
    useEffect(() => {
        fetchStats();
        fetchOrders();
        fetchBookings();
    }, []);

    const fetchHighlights = async () => {
        try {
            const headers = getAuthHeader();

            const res = await fetch(`${API}/orders`, { headers });

            if (!res.ok) throw new Error("Failed to fetch");

            const data = await res.json();

            const orders = Array.isArray(data)
                ? data
                : data.orders || [];

            // Today's date
            const today = new Date().toDateString();

            // Today's orders
            const todayOrders = orders.filter(
                (order) =>
                    new Date(order.createdAt).toDateString() === today
            );

            // Orders in progress
            const ordersInProgress = todayOrders.filter(
                (order) =>
                    order.status === "Pending" ||
                    order.status === "Preparing"
            ).length;

            // Today's revenue
            // Today's revenue
            const todayRevenue = todayOrders.reduce(
                (sum, order) => sum + (order.amount || 0),
                0
            );

            // Guests dining in
            const diningGuests = todayOrders.reduce(
                (sum, order) => sum + (order.guestCount || 0),
                0
            );

            setHighlights({
                ordersInProgress,
                todayRevenue,
                diningGuests,
            });

        } catch (err) {
            console.error("Highlights Error:", err);
        }
    };

    const fetchBookings = async () => {
        try {
            const token = localStorage.getItem("adminToken");

            const response = await fetch(
                "http://localhost:3000/api/admin/event-bookings",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const data = await response.json();

            if (response.ok) {
                setBookings(data);
            } else {
                console.error(data.message);
            }
        } catch (error) {
            console.error("Error fetching bookings:", error);
        }
    };

    const fetchStats = async () => {
        try {
            const token = localStorage.getItem("adminToken");
            if (!token) return;

            const res = await fetch(`http://localhost:3000/api/admin/stats`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            if (!res.ok) throw new Error("Failed fetch stats");

            const data = await res.json();

            setStats([
                { title: "Total Orders", value: data.totalOrders || 0, icon: <ShoppingBag size={20} /> },
                { title: "Total Revenue", value: "₹" + (data.totalRevenue || 0), icon: <IndianRupee size={20} /> },
                { title: "Total Bookings", value: data.totalBookings || 0, icon: <Calendar size={20} /> },
                { title: "Total Customers", value: data.totalCustomers || 0, icon: <Users size={20} /> },
            ]);
        } catch (err) {
            console.error("Stats Error:", err);
        }
    };
    /*
    const fetchOrders = async () => {
        try {
            const headers = getAuthHeader();
            if (Object.keys(headers).length === 0) return;

            const res = await fetch(`${API}/orders`, { headers });
            if (res.status === 401) return;

            const data = await res.json();
            const list = Array.isArray(data) ? data : (data.orders || []);
            setRecentOrders(list.slice(0, 5));
        } catch (err) {
            console.error("Fetch Orders Error:", err);
        }
    };*/

    const fetchOrders = async () => {
        try {
            const headers = getAuthHeader();

            if (Object.keys(headers).length === 0) return;

            const res = await fetch(`${API}/orders`, { headers });

            if (res.status === 401) return;

            const data = await res.json();

            const list = Array.isArray(data)
                ? data
                : data.orders || [];

            setRecentOrders(list.slice(0, 5));

            // ===== Weekly Orders =====
            const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

            const weeklyCounts = {
                Sun: 0,
                Mon: 0,
                Tue: 0,
                Wed: 0,
                Thu: 0,
                Fri: 0,
                Sat: 0,
            };

            const sevenDaysAgo = new Date();
            sevenDaysAgo.setHours(0, 0, 0, 0);
            sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);

            list.forEach((order) => {
                const orderDate = new Date(order.createdAt);

                if (orderDate >= sevenDaysAgo) {
                    const dayName = days[orderDate.getDay()];
                    weeklyCounts[dayName]++;
                }
            });

            setWeeklyData([
                { day: "Mon", orders: weeklyCounts.Mon },
                { day: "Tue", orders: weeklyCounts.Tue },
                { day: "Wed", orders: weeklyCounts.Wed },
                { day: "Thu", orders: weeklyCounts.Thu },
                { day: "Fri", orders: weeklyCounts.Fri },
                { day: "Sat", orders: weeklyCounts.Sat },
                { day: "Sun", orders: weeklyCounts.Sun },
            ]);

        } catch (err) {
            console.error("Fetch Orders Error:", err);
        }
    };


    /*
        const fetchBookings = async () => {
            try {
                const token = localStorage.getItem("adminToken");
                if (!token) return;
    
                const res = await fetch(`http://localhost:3000/api/room-bookings`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });
    
                if (!res.ok) throw new Error("Failed fetch bookings");
    
                const data = await res.json();
    
                const list = Array.isArray(data) ? data : (data.bookings || []);
                setReservations(list.slice(0, 5));
            } catch (err) {
                console.error("Fetch Bookings Error:", err);
            }
        };*/

    // --- HANDLERS ---
    const handleAddFood = async () => {
        if (!foodItem.name || !foodItem.category || !foodItem.price) {
            alert("Please fill all fields");
            return;
        }

        try {
            const headers = getAuthHeader();
            const res = await fetch(`${API}/menu`, {
                method: "POST",
                headers: { ...headers, "Content-Type": "application/json" },
                body: JSON.stringify(foodItem),
            });

            if (!res.ok) throw new Error("Failed to add food");

            alert("Food Item Added Successfully!");
            setFoodItem({ name: "", category: "", price: "" });
            setShowFoodModal(false);
            fetchStats(); // Refresh stats
        } catch (err) {
            console.error("Add food error:", err);
            alert("Error adding food");
        }
    };

    const getStatusBadge = (status) => {
        switch (status) {
            case "Delivered": return "bg-green-500/10 text-green-400 border-green-500/20";
            case "Confirmed": return "bg-green-500/10 text-green-400 border-green-500/20";
            case "Preparing": return "bg-yellow-500/10 text-yellow-400 border-yellow-500/20";
            case "Pending": return "bg-red-500/10 text-red-400 border-red-500/20";
            default: return "bg-zinc-500/10 text-zinc-400 border-zinc-500/20";
        }
    };

    /*
    const weeklyData = [
        { day: "Mon", orders: 45 }, { day: "Tue", orders: 52 }, { day: "Wed", orders: 38 },
        { day: "Thu", orders: 65 }, { day: "Fri", orders: 78 }, { day: "Sat", orders: 92 }, { day: "Sun", orders: 85 },
    ];*/

    useEffect(() => {
        fetch("http://localhost:3000/api/contact")
            .then((res) => res.json())
            .then((data) => setMessages(data));
    }, []);

    useEffect(() => {
        fetch("http://localhost:3000/api/event-bookings")
            .then((res) => res.json())
            .then((data) => {
                console.log("EVENT BOOKINGS:", data);
                setEventBookings(data);
            })
            .catch(console.error);
    }, []);

    useEffect(() => {
        const fetchRoomBookings = async () => {
            try {
                const token = localStorage.getItem("adminToken");

                const res = await fetch("http://localhost:3000/api/room-bookings", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });

                if (!res.ok) throw new Error("Unauthorized or failed");

                const data = await res.json();
                setRoomBookings(Array.isArray(data) ? data : []);
            } catch (err) {
                console.error(err);
            }
        };

        fetchRoomBookings();
    }, []);


    useEffect(() => {
        fetchStats();
        fetchOrders();
        fetchBookings();
        fetchHighlights();

        const interval = setInterval(() => {
            fetchStats();
            fetchOrders();
            fetchBookings();
            fetchHighlights();
        }, 30000); // every 30 sec

        return () => clearInterval(interval);

    }, []);

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
                                <div className={`flex items-center gap-1 mt-2 text-sm ${item.changeType === "positive" ? "text-green-400" : "text-red-400"
                                    }`}>
                                    {item.changeType === "positive" ? (
                                        <TrendingUp size={14} />
                                    ) : (
                                        <TrendingDown size={14} />
                                    )}
                                    {item.change} from last week
                                </div>
                            </div>
                            <div className={`p-3 rounded-xl ${item.color || "bg-indigo-500/10 text-indigo-400"
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

                {/* Quick Stats 
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
                </div>*/}

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

                            <span className="text-2xl font-bold text-indigo-400">
                                {highlights.ordersInProgress}
                            </span>
                        </div>

                        <div className="flex items-center justify-between p-3 bg-zinc-800/50 rounded-xl">
                            <div className="flex items-center gap-3">
                                <Wallet className="text-green-400" size={20} />
                                <div>
                                    <p className="font-medium">Revenue</p>
                                    <p className="text-xs text-zinc-400">Today</p>
                                </div>
                            </div>

                            <span className="text-2xl font-bold text-green-400">
                                ₹{highlights.todayRevenue.toLocaleString()}
                            </span>
                        </div>

                        <div className="flex items-center justify-between p-3 bg-zinc-800/50 rounded-xl">
                            <div className="flex items-center gap-3">
                                <Users className="text-yellow-400" size={20} />
                                <div>
                                    <p className="font-medium">Guests</p>
                                    <p className="text-xs text-zinc-400">Dining in</p>
                                </div>
                            </div>

                            <span className="text-2xl font-bold text-yellow-400">
                                {highlights.diningGuests}
                            </span>
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
                                    <th className="p-4" >Status</th>
                                    <th className="p-4">Table</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentOrders.map((order) => (
                                    <tr
                                        key={order._id}
                                        className="border-t border-white/5 hover:bg-white/5 transition"
                                    >
                                        <td className="p-4">
                                            <span className="text-indigo-400 font-medium">
                                                {order.orderId}
                                            </span>
                                        </td>

                                        <td className="p-4">
                                            <div>
                                                <p className="font-medium">
                                                    {order.customer?.name}
                                                </p>

                                                <p className="text-xs text-zinc-500">
                                                    {order.customer?.phone}
                                                </p>
                                            </div>
                                        </td>

                                        <td className="p-4 font-semibold">
                                            ₹{order.amount}
                                        </td>

                                        <td className="p-4">
                                            <div className="flex items-center gap-2">
                                                <span
                                                    className={`px-3 py-1 text-xs rounded-full border ${getStatusBadge(
                                                        order.status
                                                    )}`}
                                                >
                                                    {order.status}
                                                </span>
                                            </div>
                                        </td>
                                        <td>
                                            {order.tableId
                                                ? `Table #${order.tableId}`
                                                : "Delivery"}
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
                    {/*
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
                    </div>*/}

                    <div className="space-y-3">
                        {eventBookings?.map((booking) => (
                            <div
                                key={booking._id}
                                className="flex items-center justify-between p-4 bg-zinc-800/50 rounded-xl hover:bg-zinc-800 transition"
                            >
                                <div>
                                    <p className="font-medium">{booking.name}</p>

                                    <p className="text-sm text-zinc-400">
                                        {booking.eventType} • {booking.guests} guests
                                    </p>

                                    <p className="text-xs text-zinc-500">
                                        {new Date(booking.date).toLocaleDateString()}
                                    </p>
                                </div>

                                <span
                                    className={`px-3 py-1 text-xs rounded-full border ${getStatusBadge(
                                        booking.status
                                    )}`}
                                >
                                    {booking.status}
                                </span>
                            </div>
                        ))}
                    </div>

                </div>
            </div>

            <div className="bg-zinc-900 border border-white/10 rounded-2xl p-6 mb-6 mt-6">
                <h2 className="text-xl font-semibold mb-5">
                    Room Booking Requests
                </h2>

                <div className="overflow-x-auto">
                    <table className="w-full text-white">
                        <thead>
                            <tr className="text-zinc-400 text-left">
                                <th className="p-3">Name</th>
                                <th className="p-3">Room Type</th>
                                <th className="p-3">Guests</th>
                                <th className="p-3">Check-In</th>
                                <th className="p-3">Check-Out</th>
                                <th className="p-3">Phone</th>
                            </tr>
                        </thead>

                        <tbody>
                            {roomBookings.map((booking) => (
                                <tr
                                    key={booking._id}
                                    className="border-t border-white/10"
                                >
                                    <td className="p-3">{booking.name}</td>

                                    <td className="p-3">
                                        {booking.roomType}
                                    </td>

                                    <td className="p-3">
                                        {booking.guests}
                                    </td>

                                    <td className="p-3">
                                        {new Date(booking.checkIn).toLocaleDateString()}
                                    </td>

                                    <td className="p-3">
                                        {new Date(booking.checkOut).toLocaleDateString()}
                                    </td>

                                    <td className="p-3">
                                        {booking.phone}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Contact Messages */}
            <div className="bg-zinc-900 border border-white/10 rounded-2xl overflow-hidden mb-6">
                <div className="p-5 border-b border-white/10">
                    <h2 className="text-xl font-semibold">Contact Messages</h2>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="text-left text-zinc-400 text-sm">
                                <th className="p-4">Name</th>
                                <th className="p-4">Email</th>
                                <th className="p-4">Phone</th>
                                <th className="p-4">Subject</th>
                                <th className="p-4">Message</th>
                            </tr>
                        </thead>

                        <tbody>
                            {messages?.length > 0 ? (
                                messages.map((msg) => (
                                    <tr
                                        key={msg._id}
                                        className="border-t border-white/5 hover:bg-white/5 transition"
                                    >
                                        <td className="p-4">{msg.name}</td>
                                        <td className="p-4">{msg.email}</td>
                                        <td className="p-4">{msg.phone}</td>
                                        <td className="p-4">{msg.subject}</td>
                                        <td className="p-4">{msg.message}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="p-4 text-center text-zinc-500">
                                        No contact messages found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
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
