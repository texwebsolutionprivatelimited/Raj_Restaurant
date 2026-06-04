import { useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import {
    Menu,
    X,
    LogOut,
    LayoutDashboard,
    ShoppingBag,
    Calendar,
    Users,
    Package,
    CreditCard,
    Tag,
    Settings,
    Layers,
} from "lucide-react";

export default function AdminLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const location = useLocation();

    const menuItems = [
        { path: "/admin", label: "Dashboard", icon: LayoutDashboard },
        { path: "/admin/orders", label: "Orders", icon: ShoppingBag },
        { path: "/admin/bookings", label: "Bookings", icon: Calendar },
        { path: "/admin/customers", label: "Customers", icon: Users },
        { path: "/admin/inventory", label: "Inventory", icon: Package },
        { path: "/admin/categories", label: "Categories", icon: Layers },
        { path: "/admin/payments", label: "Payments", icon: CreditCard },
        { path: "/admin/offers", label: "Offers", icon: Tag },
        { path: "/admin/settings", label: "Settings", icon: Settings },
    ];

    return (
        <div className="min-h-screen bg-zinc-950 text-white">
            {/* Mobile Menu */}
            <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden absolute top-4 left-4 z-50 bg-indigo-600 p-2 rounded-lg"
            >
                <Menu size={20} />
            </button>

            {/* Overlay */}
            {sidebarOpen && (
                <div
                    onClick={() => setSidebarOpen(false)}
                    className="fixed inset-0 bg-black/60 z-40 lg:hidden"
                />
            )}

            {/* Sidebar */}
            <aside
                className={`
          fixed top-0 left-0 z-50
          w-64 h-screen
          bg-zinc-950 border-r border-white/10
          p-6 transition-transform duration-300

          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
            >
                <div className="flex justify-between items-center mb-10">
                    <h2 className="text-2xl font-bold">Admin Panel</h2>

                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="lg:hidden"
                    >
                        <X />
                    </button>
                </div>

                <nav className="space-y-2">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        const active = location.pathname === item.path;

                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                onClick={() => setSidebarOpen(false)}
                            >
                                <div
                                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition ${active
                                        ? "bg-indigo-600 text-white"
                                        : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
                                        }`}
                                >
                                    <Icon size={18} />
                                    {item.label}
                                </div>
                            </Link>
                        );
                    })}

                    <button className="w-full mt-6 flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-xl">
                        <LogOut size={18} />
                        Logout
                    </button>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="lg:ml-64 px-4 sm:px-6 pt-20 lg:pt-6 pb-6">
                <Outlet />
            </main>
        </div>
    );
}