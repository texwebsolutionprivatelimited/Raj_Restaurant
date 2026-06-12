import { useState, useEffect } from "react";
import { IndianRupee, CreditCard, Wallet, Banknote, Search, Filter } from "lucide-react";

export default function Payments() {
  const [payments, setPayments] = useState([]);
  const [search, setSearch] = useState("");
  const [filterMethod, setFilterMethod] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/payments");
        const data = await res.json();

        // IMPORTANT: normalize id (_id → id)
        const formatted = data.map((p) => ({
          ...p,
          id: p._id || p.id,
        }));

        setPayments(formatted);
      } catch (err) {
        console.error("Payments fetch error:", err);
        setPayments([]);
      }
    };

    fetchPayments();
  }, []);

  // Filter payments
  const filteredPayments = payments.filter((p) => {
    const matchesSearch =
      (p?.customer || "").toLowerCase().includes(search.toLowerCase()) ||
      (p?.orderId || "").toLowerCase().includes(search.toLowerCase()) ||
      (p?.phone || "").includes(search);

    const matchesMethod = filterMethod ? p.method === filterMethod : true;
    const matchesStatus = filterStatus ? p.status === filterStatus : true;

    return matchesSearch && matchesMethod && matchesStatus;
  });

  const totalRevenue = payments
    .filter(p => p.status === "Success")
    .reduce((acc, p) => acc + p.amount, 0);

  const successCount = payments.filter(p => p.status === "Success").length;
  const pendingCount = payments.filter(p => p.status === "Pending").length;
  const failedCount = payments.filter(p => p.status === "Failed").length;

  const stats = [
    {
      label: "Total Revenue",
      value: `${totalRevenue.toLocaleString()}`,
      icon: <IndianRupee size={18} />,
      color: "text-green-400"
    },
    {
      label: "Success Payments",
      value: successCount,
      icon: <Wallet size={18} />,
      color: "text-indigo-400"
    },
    {
      label: "Pending",
      value: pendingCount,
      icon: <Filter size={18} />,
      color: "text-yellow-400"
    },
    {
      label: "Failed",
      value: failedCount,
      color: "text-red-400"
    },
  ];

  const getMethodIcon = (method) => {
    if (method === "UPI") return <Wallet size={16} />;
    if (method === "Card") return <CreditCard size={16} />;
    return <Banknote size={16} />;
  };

  const createPayment = async (paymentData) => {
    const res = await fetch("http://localhost:3000/api/payments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(paymentData),
    });

    const data = await res.json();
    setPayments((prev) => [...prev, { ...data, id: data._id }]);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this payment?")) return;

    try {
      await fetch(`http://localhost:3000/api/payments/${id}`, {
        method: "DELETE",
      });

      setPayments((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="mt-2 px-2 md:px-0">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl md:text-4xl font-semibold">
            Payments
          </h1>
          <p className="text-zinc-500 text-sm mt-1">
            Track transactions & revenue analytics
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((s, i) => (
          <div
            key={i}
            className="bg-zinc-900/60 border border-white/10 rounded-2xl p-5 hover:scale-[1.02] transition"
          >
            <p className="text-zinc-400 text-sm">{s.label}</p>
            <p className={`text-2xl font-semibold mt-1 flex items-center gap-2 ${s.color}`}>
              {s.icon}
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
            placeholder="Search by customer, order or phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-zinc-900/60 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white outline-none focus:border-indigo-500 transition"
          />
        </div>

        <select
          value={filterMethod}
          onChange={(e) => setFilterMethod(e.target.value)}
          className="bg-zinc-900/60 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-indigo-500 transition"
        >
          <option value="">All Methods</option>
          <option value="UPI">UPI</option>
          <option value="Card">Card</option>
          <option value="Cash">Cash</option>
        </select>

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="bg-zinc-900/60 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-indigo-500 transition"
        >
          <option value="">All Status</option>
          <option value="Success">Success</option>
          <option value="Pending">Pending</option>
          <option value="Failed">Failed</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-zinc-900/60 border border-white/10 rounded-2xl overflow-hidden">

        {/* Header */}
        <div className="p-5 border-b border-white/10">
          <h2 className="text-lg font-medium">Transactions</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">

            <thead>
              <tr className="text-left text-zinc-400 text-sm">
                <th className="p-4">Payment ID</th>
                <th className="p-4">Customer</th>
                <th className="p-4">Phone</th>
                <th className="p-4">Method</th>
                <th className="p-4">Amount</th>
                <th className="p-4">Date</th>
                <th className="p-4">Status</th>
                <th className="p-4">TXN ID</th>
              </tr>
            </thead>

            <tbody>
              {filteredPayments.length > 0 ? (
                filteredPayments.map((p) => (
                  <tr
                    key={p.id}
                    className="border-t border-white/5 hover:bg-white/5 transition"
                  >
                    <td className="p-4 font-medium text-indigo-400">{p.id}</td>
                    <td className="p-4 font-medium">{p.customer}</td>
                    <td className="p-4 text-zinc-400">{p.phone}</td>

                    <td className="p-4">
                      <span className="flex items-center gap-2 text-zinc-300">
                        {getMethodIcon(p.method)}
                        {p.method}
                      </span>
                    </td>

                    <td className="p-4 font-semibold text-white">
                      ₹{p.amount}
                    </td>

                    <td className="p-4 text-zinc-400">{p.date}</td>

                    <td className="p-4">
                      <span
                        className={`px-3 py-1 text-xs rounded-full border
                        ${p.status === "Success"
                            ? "bg-green-500/10 text-green-400 border-green-500/20"
                            : p.status === "Pending"
                              ? "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
                              : "bg-red-500/10 text-red-400 border-red-500/20"
                          }`}
                      >
                        {p.status}
                      </span>
                    </td>

                    <td className="p-4 text-zinc-500 text-xs">
                      {p.transactionId}
                    </td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="p-8 text-center text-zinc-500">
                    No payments found
                  </td>
                </tr>
              )}
            </tbody>

          </table>
        </div>
      </div>
    </div>
  );
}