import { useState, useEffect } from "react";
import {
  Save,
  User,
  Mail,
  Phone,
  Globe,
  CreditCard,
  Bell,
  Shield,
SettingsIcon,
  DollarSign,
  Clock,
  CheckCircle,
} from "lucide-react";

export default function Settings() {
  const [message, setMessage] = useState("");
  const [activeTab, setActiveTab] = useState("general");

  const [settings, setSettings] = useState({
    // General
    restaurantName: "Raj Restaurant",
    email: "admin@rajrestaurant.com",
    phone: "+91 9876543210",
    address: "123 Food Street, Mumbai",
    description: "Best authentic Indian cuisine",

    // Location
    currency: "INR",
    timezone: "Asia/Kolkata",
    language: "en",

    // Order Settings
    orderPrepTime: "30",
    minOrderAmount: "100",
    maxOrderAmount: "5000",
    deliveryRadius: "10",

    // Payment
    acceptCOD: true,
    acceptUPI: true,
    acceptCard: true,

    // Notifications
    emailNotifications: true,
    smsNotifications: true,
    orderAlerts: true,

    // Tax
    taxEnabled: false,
    taxName: "GST",
    taxRate: "18",

    // App Settings
    maintenanceMode: false,
    darkMode: true,
  });

const tabs = [
  {
    id: "general",
    label: "General",
    icon: <SettingsIcon size={18} />,
  },
  {
    id: "orders",
    label: "Orders",
    icon: <Clock size={18} />,
  },
  {
    id: "payment",
    label: "Payment",
    icon: <CreditCard size={18} />,
  },
  {
    id: "notifications",
    label: "Notifications",
    icon: <Bell size={18} />,
  },
  {
    id: "tax",
    label: "Tax & Fees",
    icon: <DollarSign size={18} />,
  },
];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings({
      ...settings,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleSave = () => {
    localStorage.setItem("restaurantSettings", JSON.stringify(settings));
    setMessage("Settings saved successfully!");
    setTimeout(() => setMessage(""), 3000);
  };

  useEffect(() => {
    const saved = localStorage.getItem("restaurantSettings");
    if (saved) {
      setSettings({ ...settings, ...JSON.parse(saved) });
    }
  }, []);

  return (
    <div className="mt-2 px-2 md:px-0">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-4xl font-semibold">
          Settings
        </h1>
        <p className="text-zinc-500 text-sm mt-1">
          Manage restaurant configuration & preferences
        </p>
      </div>

      {/* Success Message */}
      {message && (
        <div className="mb-6 flex items-center gap-2 bg-green-500/10 border border-green-500/20 text-green-400 px-4 py-3 rounded-xl">
          <CheckCircle size={18} />
          {message}
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition ${activeTab === tab.id
                ? "bg-indigo-600 text-white"
                : "bg-zinc-900/60 border border-white/10 text-zinc-400 hover:text-white"
              }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* General Settings */}
      {activeTab === "general" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-zinc-900/60 border border-white/10 rounded-2xl p-6">
            <h2 className="text-lg font-medium mb-5">
              Restaurant Information
            </h2>
            <div className="space-y-5">
              <div>
                <label className="text-sm text-zinc-400">Restaurant Name</label>
                <input
                  type="text"
                  name="restaurantName"
                  value={settings.restaurantName}
                  onChange={handleChange}
                  className="mt-2 w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition"
                />
              </div>
              <div>
                <label className="text-sm text-zinc-400">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={settings.email}
                  onChange={handleChange}
                  className="mt-2 w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition"
                />
              </div>
              <div>
                <label className="text-sm text-zinc-400">Phone Number</label>
                <input
                  type="text"
                  name="phone"
                  value={settings.phone}
                  onChange={handleChange}
                  className="mt-2 w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition"
                />
              </div>
              <div>
                <label className="text-sm text-zinc-400">Description</label>
                <textarea
                  name="description"
                  value={settings.description}
                  onChange={handleChange}
                  rows={3}
                  className="mt-2 w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition"
                />
              </div>
            </div>
          </div>

          <div className="bg-zinc-900/60 border border-white/10 rounded-2xl p-6">
            <h2 className="text-lg font-medium mb-5">
              Location & Regional
            </h2>
            <div className="space-y-5">
              <div>
                <label className="text-sm text-zinc-400">Address</label>
                <textarea
                  name="address"
                  value={settings.address}
                  onChange={handleChange}
                  rows={3}
                  className="mt-2 w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition"
                />
              </div>
              <div>
                <label className="text-sm text-zinc-400">Currency</label>
                <select
                  name="currency"
                  value={settings.currency}
                  onChange={handleChange}
                  className="mt-2 w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition"
                >
                  <option value="INR">INR (₹)</option>
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                </select>
              </div>
              <div>
                <label className="text-sm text-zinc-400">Timezone</label>
                <select
                  name="timezone"
                  value={settings.timezone}
                  onChange={handleChange}
                  className="mt-2 w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition"
                >
                  <option value="Asia/Kolkata">India (IST)</option>
                  <option value="America/New_York">New York (EST)</option>
                  <option value="Europe/London">London (GMT)</option>
                </select>
              </div>
              <div>
                <label className="text-sm text-zinc-400">Language</label>
                <select
                  name="language"
                  value={settings.language}
                  onChange={handleChange}
                  className="mt-2 w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition"
                >
                  <option value="en">English</option>
                  <option value="hi">Hindi</option>
                  <option value="mr">Marathi</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Order Settings */}
      {activeTab === "orders" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-zinc-900/60 border border-white/10 rounded-2xl p-6">
            <h2 className="text-lg font-medium mb-5">
              Order Configuration
            </h2>
            <div className="space-y-5">
              <div>
                <label className="text-sm text-zinc-400">Preparation Time (minutes)</label>
                <input
                  type="number"
                  name="orderPrepTime"
                  value={settings.orderPrepTime}
                  onChange={handleChange}
                  className="mt-2 w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition"
                />
              </div>
              <div>
                <label className="text-sm text-zinc-400">Minimum Order Amount (₹)</label>
                <input
                  type="number"
                  name="minOrderAmount"
                  value={settings.minOrderAmount}
                  onChange={handleChange}
                  className="mt-2 w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition"
                />
              </div>
              <div>
                <label className="text-sm text-zinc-400">Maximum Order Amount (₹)</label>
                <input
                  type="number"
                  name="maxOrderAmount"
                  value={settings.maxOrderAmount}
                  onChange={handleChange}
                  className="mt-2 w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition"
                />
              </div>
              <div>
                <label className="text-sm text-zinc-400">Delivery Radius (km)</label>
                <input
                  type="number"
                  name="deliveryRadius"
                  value={settings.deliveryRadius}
                  onChange={handleChange}
                  className="mt-2 w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition"
                />
              </div>
            </div>
          </div>

          <div className="bg-zinc-900/60 border border-white/10 rounded-2xl p-6">
            <h2 className="text-lg font-medium mb-5">
              App Settings
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-black/40 rounded-xl">
                <div>
                  <p className="font-medium">Maintenance Mode</p>
                  <p className="text-sm text-zinc-400">Temporarily hide restaurant</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="maintenanceMode"
                    checked={settings.maintenanceMode}
                    onChange={handleChange}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-zinc-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                </label>
              </div>
              <div className="flex items-center justify-between p-4 bg-black/40 rounded-xl">
                <div>
                  <p className="font-medium">Dark Mode</p>
                  <p className="text-sm text-zinc-400">Enable dark theme</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="darkMode"
                    checked={settings.darkMode}
                    onChange={handleChange}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-zinc-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                </label>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Payment Settings */}
      {activeTab === "payment" && (
        <div className="bg-zinc-900/60 border border-white/10 rounded-2xl p-6">
          <h2 className="text-lg font-medium mb-5">
            Payment Methods
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center justify-between p-4 bg-black/40 rounded-xl">
              <div className="flex items-center gap-3">
                <CreditCard size={24} className="text-indigo-400" />
                <div>
                  <p className="font-medium">Cash on Delivery</p>
                  <p className="text-sm text-zinc-400">Accept COD</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="acceptCOD"
                  checked={settings.acceptCOD}
                  onChange={handleChange}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-zinc-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
              </label>
            </div>
            <div className="flex items-center justify-between p-4 bg-black/40 rounded-xl">
              <div className="flex items-center gap-3">
                <CreditCard size={24} className="text-green-400" />
                <div>
                  <p className="font-medium">UPI Payment</p>
                  <p className="text-sm text-zinc-400">Google Pay, Paytm</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="acceptUPI"
                  checked={settings.acceptUPI}
                  onChange={handleChange}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-zinc-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
              </label>
            </div>
            <div className="flex items-center justify-between p-4 bg-black/40 rounded-xl">
              <div className="flex items-center gap-3">
                <CreditCard size={24} className="text-blue-400" />
                <div>
                  <p className="font-medium">Card Payment</p>
                  <p className="text-sm text-zinc-400">Credit/Debit cards</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="acceptCard"
                  checked={settings.acceptCard}
                  onChange={handleChange}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-zinc-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
              </label>
            </div>
          </div>
        </div>
      )}

      {/* Notifications */}
      {activeTab === "notifications" && (
        <div className="bg-zinc-900/60 border border-white/10 rounded-2xl p-6">
          <h2 className="text-lg font-medium mb-5">
            Notification Preferences
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-black/40 rounded-xl">
              <div className="flex items-center gap-3">
                <Mail size={24} className="text-indigo-400" />
                <div>
                  <p className="font-medium">Email Notifications</p>
                  <p className="text-sm text-zinc-400">Receive updates via email</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="emailNotifications"
                  checked={settings.emailNotifications}
                  onChange={handleChange}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-zinc-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-4 bg-black/40 rounded-xl">
              <div className="flex items-center gap-3">
                <Phone size={24} className="text-green-400" />
                <div>
                  <p className="font-medium">SMS Notifications</p>
                  <p className="text-sm text-zinc-400">Receive alerts on phone</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="smsNotifications"
                  checked={settings.smsNotifications}
                  onChange={handleChange}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-zinc-700 rounded-full peer peer-checked:bg-indigo-600 relative after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:h-5 after:w-5 after:rounded-full after:transition-all peer-checked:after:translate-x-full"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-4 bg-black/40 rounded-xl">
              <div className="flex items-center gap-3">
                <Bell size={24} className="text-yellow-400" />
                <div>
                  <p className="font-medium">Order Alerts</p>
                  <p className="text-sm text-zinc-400">Instant order notifications</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="orderAlerts"
                  checked={settings.orderAlerts}
                  onChange={handleChange}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-zinc-700 rounded-full peer peer-checked:bg-indigo-600 relative after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:h-5 after:w-5 after:rounded-full after:transition-all peer-checked:after:translate-x-full"></div>
              </label>
            </div>
          </div>
        </div>
      )}

      {/* Tax Settings */}
      {activeTab === "tax" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-zinc-900/60 border border-white/10 rounded-2xl p-6">
            <h2 className="text-lg font-medium mb-5">
              Tax Configuration
            </h2>

            <div className="space-y-5">
              <div className="flex items-center justify-between p-4 bg-black/40 rounded-xl">
                <div>
                  <p className="font-medium">Enable Tax</p>
                  <p className="text-sm text-zinc-400">
                    Apply tax on customer orders
                  </p>
                </div>

                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="taxEnabled"
                    checked={settings.taxEnabled}
                    onChange={handleChange}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-zinc-700 rounded-full peer peer-checked:bg-indigo-600 relative after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:h-5 after:w-5 after:rounded-full after:transition-all peer-checked:after:translate-x-full"></div>
                </label>
              </div>

              {settings.taxEnabled && (
                <>
                  <div>
                    <label className="text-sm text-zinc-400">
                      Tax Name
                    </label>
                    <input
                      type="text"
                      name="taxName"
                      value={settings.taxName}
                      onChange={handleChange}
                      className="mt-2 w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="text-sm text-zinc-400">
                      Tax Rate (%)
                    </label>
                    <input
                      type="number"
                      name="taxRate"
                      value={settings.taxRate}
                      onChange={handleChange}
                      className="mt-2 w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="bg-zinc-900/60 border border-white/10 rounded-2xl p-6">
            <h2 className="text-lg font-medium mb-5">
              Security & System
            </h2>

            <div className="space-y-4">
              <div className="p-4 bg-black/40 rounded-xl flex items-start gap-3">
                <Shield className="text-green-400 mt-1" size={20} />
                <div>
                  <p className="font-medium">System Status</p>
                  <p className="text-sm text-zinc-400">
                    Restaurant application is secure and running normally.
                  </p>
                </div>
              </div>

              <div className="p-4 bg-black/40 rounded-xl flex items-start gap-3">
                <Globe className="text-indigo-400 mt-1" size={20} />
                <div>
                  <p className="font-medium">Server Region</p>
                  <p className="text-sm text-zinc-400">
                    Asia Pacific (Mumbai)
                  </p>
                </div>
              </div>

              <div className="p-4 bg-black/40 rounded-xl flex items-start gap-3">
                <User className="text-yellow-400 mt-1" size={20} />
                <div>
                  <p className="font-medium">Admin Access</p>
                  <p className="text-sm text-zinc-400">
                    Full administrator privileges enabled.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Save Button */}
      <div className="mt-8 flex justify-end">
        <button
          onClick={handleSave}
          className="bg-indigo-600 hover:bg-indigo-700 transition px-6 py-3 rounded-xl flex items-center gap-2 font-medium"
        >
          <Save size={18} />
          Save Settings
        </button>
      </div>
    </div>
  );
}