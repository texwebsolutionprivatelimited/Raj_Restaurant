import { useState, useEffect } from "react";
import { Gift, Plus, Edit, Trash2, Search, X, Tag, Calendar, Users, Clock } from "lucide-react";

export default function Offers() {
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  const [newCoupon, setNewCoupon] = useState({
    code: "",
    discount: "",
    type: "Percentage",
    minOrder: "",
    maxUsage: "",
    validUntil: "",
    description: "",
  });

  const [coupons, setCoupons] = useState([]);

  useEffect(() => {
    setCoupons([
      { id: 1, code: "WELCOME20", discount: "20%", type: "Percentage", minOrder: "₹500", usage: 45, maxUsage: 100, validUntil: "2024-02-28", active: true, description: "New user welcome offer" },
      { id: 2, code: "BIRYANI10", discount: "10%", type: "Flat", minOrder: "₹300", usage: 20, maxUsage: 50, validUntil: "2024-01-31", active: true, description: "Special on biryani" },
      { id: 3, code: "FREESHIP", discount: "Free", type: "Shipping", minOrder: "₹200", usage: 100, maxUsage: 200, validUntil: "2024-03-15", active: true, description: "Free delivery on orders above ₹200" },
      { id: 4, code: "SUMMER25", discount: "25%", type: "Percentage", minOrder: "₹1000", usage: 0, maxUsage: 50, validUntil: "2024-04-30", active: false, description: "Summer special offer" },
      { id: 5, code: "FIRST50", discount: "50%", type: "Percentage", minOrder: "₹150", usage: 50, maxUsage: 50, validUntil: "2023-12-31", active: false, description: "First order discount" },
      { id: 6, code: "PARTY10", discount: "₹100", type: "Flat", minOrder: "₹800", usage: 15, maxUsage: 30, validUntil: "2024-02-15", active: true, description: "Party orders discount" },
    ]);
  }, []);

  // Filter coupons
  const filteredCoupons = coupons.filter((coupon) => {
    const matchesSearch = coupon.code.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = filterStatus === "" ? true : filterStatus === "active" ? coupon.active : !coupon.active;
    return matchesSearch && matchesStatus;
  });

  const totalUsage = coupons.reduce((acc, c) => acc + c.usage, 0);
  const activeCount = coupons.filter(c => c.active).length;
  const totalSavings = coupons.reduce((acc, c) => acc + (c.usage * parseInt(c.discount.replace("%", "").replace("₹", "") || 0)), 0);

  const stats = [
    { label: "Total Coupons", value: coupons.length, icon: <Tag size={18} /> },
    { label: "Active", value: activeCount, color: "text-green-400", icon: <Gift size={18} /> },
    { label: "Total Usage", value: totalUsage, color: "text-indigo-400", icon: <Users size={18} /> },
    { label: "Total Discount Given", value: `₹${totalSavings}`, color: "text-yellow-400", icon: <Clock size={18} /> },
  ];

  const handleEdit = (coupon) => {
    setEditId(coupon.id);
    setNewCoupon({
      code: coupon.code,
      discount: coupon.discount.replace("%", "").replace("₹", ""),
      type: coupon.type,
      minOrder: coupon.minOrder.replace("₹", ""),
      maxUsage: coupon.maxUsage,
      validUntil: coupon.validUntil,
      description: coupon.description || "",
    });
    setShowModal(true);
  };

  const handleCreateCoupon = () => {
    if (!newCoupon.code || !newCoupon.discount) {
      alert("Please fill required fields");
      return;
    }

    const discountValue = newCoupon.type === "Flat" ? `₹${newCoupon.discount}` : `${newCoupon.discount}%`;

    if (editId) {
      setCoupons(
        coupons.map((coupon) =>
          coupon.id === editId
            ? {
              ...coupon,
              code: newCoupon.code.toUpperCase(),
              discount: discountValue,
              type: newCoupon.type,
              minOrder: `₹${newCoupon.minOrder}`,
              maxUsage: Number(newCoupon.maxUsage),
              validUntil: newCoupon.validUntil,
              description: newCoupon.description,
            }
            : coupon
        )
      );
    } else {
      const coupon = {
        id: Date.now(),
        code: newCoupon.code.toUpperCase(),
        discount: discountValue,
        type: newCoupon.type,
        minOrder: `₹${newCoupon.minOrder}`,
        usage: 0,
        maxUsage: Number(newCoupon.maxUsage),
        validUntil: newCoupon.validUntil,
        description: newCoupon.description,
        active: true,
      };

      setCoupons([coupon, ...coupons]);
    }

    handleCloseModal();
  };

  const handleDelete = (id) => {
    if (!window.confirm("Delete this coupon?")) return;
    setCoupons(coupons.filter((coupon) => coupon.id !== id));
  };

  const handleToggleStatus = (id) => {
    setCoupons(coupons.map(coupon =>
      coupon.id === id ? { ...coupon, active: !coupon.active } : coupon
    ));
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditId(null);
    setNewCoupon({
      code: "",
      discount: "",
      type: "Percentage",
      minOrder: "",
      maxUsage: "",
      validUntil: "",
      description: "",
    });
  };

  return (
    <div className="mt-2 px-2 md:px-0">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl md:text-4xl font-semibold">
            Offers & Coupons
          </h1>
          <p className="text-zinc-500 text-sm mt-1">
            Manage discounts & promotions
          </p>
        </div>

        <button
          onClick={() => {
            handleCloseModal();
            setShowModal(true);
          }}
          className="bg-indigo-500 hover:bg-indigo-600 transition px-4 py-2 rounded-xl flex items-center gap-2 text-sm font-medium"
        >
          <Plus size={18} />
          Create Coupon
        </button>
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

      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
            size={18}
          />
          <input
            type="text"
            placeholder="Search coupons..."
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
          <option value="">All Coupons</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      {/* Coupons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {filteredCoupons.map((coupon) => {
          const percent = (coupon.usage / coupon.maxUsage) * 100;
          const isExpired = new Date(coupon.validUntil) < new Date();

          return (
            <div
              key={coupon.id}
              className={`bg-zinc-900/60 border rounded-2xl p-6 hover:scale-[1.02] transition
              ${coupon.active && !isExpired ? "border-white/10" : "border-red-500/20 opacity-70"}`}
            >

              {/* Top */}
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-2">
                  <Gift
                    size={20}
                    className={coupon.active && !isExpired ? "text-indigo-400" : "text-zinc-500"}
                  />
                  <h2 className="text-lg font-semibold tracking-wide">
                    {coupon.code}
                  </h2>
                </div>

                <span
                  className={`text-xs px-2 py-1 rounded-full border
                  ${coupon.active && !isExpired
                      ? "bg-green-500/10 text-green-400 border-green-500/20"
                      : isExpired
                        ? "bg-red-500/10 text-red-400 border-red-500/20"
                        : "bg-zinc-500/10 text-zinc-400 border-zinc-500/20"
                    }`}
                >
                  {isExpired ? "Expired" : coupon.active ? "Active" : "Inactive"}
                </span>
              </div>

              {/* Discount */}
              <div className="mb-2">
                <p className="text-3xl font-bold text-white">
                  {coupon.discount} OFF
                </p>
                <p className="text-zinc-400 text-sm">{coupon.type} Discount</p>
              </div>

              {/* Description */}
              {coupon.description && (
                <p className="text-zinc-500 text-xs mb-4">{coupon.description}</p>
              )}

              {/* Info */}
              <div className="space-y-1 text-sm mb-4">
                <p className="text-zinc-400 flex items-center gap-2">
                  <Calendar size={12} />
                  Min Order: <span className="text-white">{coupon.minOrder}</span>
                </p>
                <p className="text-zinc-400 flex items-center gap-2">
                  <Clock size={12} />
                  Valid Until: <span className="text-white">{coupon.validUntil}</span>
                </p>
                <p className="text-zinc-400 flex items-center gap-2">
                  <Users size={12} />
                  Usage:{" "}
                  <span className="text-white">
                    {coupon.usage} / {coupon.maxUsage}
                  </span>
                </p>
              </div>

              {/* Progress */}
              <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden mb-5">
                <div
                  className={`h-2 rounded-full transition-all
                  ${percent > 80 ? "bg-red-500" : percent > 50 ? "bg-yellow-500" : "bg-indigo-500"}`}
                  style={{ width: `${Math.min(percent, 100)}%` }}
                />
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(coupon)}
                  className="flex-1 flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 transition rounded-xl py-2 text-sm"
                >
                  <Edit size={16} />
                  Edit
                </button>

                <button
                  onClick={() => handleToggleStatus(coupon.id)}
                  className={`px-3 py-2 rounded-xl transition ${coupon.active
                      ? "bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-400"
                      : "bg-green-500/10 hover:bg-green-500/20 text-green-400"
                    }`}
                >
                  {coupon.active ? "Disable" : "Enable"}
                </button>

                <button
                  onClick={() => handleDelete(coupon.id)}
                  className="px-3 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 transition"
                >
                  <Trash2 size={16} />
                </button>
              </div>

            </div>
          );
        })}

      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-zinc-900 w-full max-w-md rounded-2xl p-6 border border-white/10">
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-xl font-semibold">
                {editId ? "Edit Coupon" : "Create Coupon"}
              </h2>
              <button
                onClick={handleCloseModal}
                className="p-2 hover:bg-zinc-800 rounded-lg"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              {/* Coupon Code */}
              <div>
                <label className="text-sm text-zinc-400 mb-1 block">Coupon Code *</label>
                <input
                  placeholder="e.g. WELCOME20"
                  value={newCoupon.code}
                  onChange={(e) =>
                    setNewCoupon({ ...newCoupon, code: e.target.value.toUpperCase() })
                  }
                  className="w-full bg-zinc-800 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Discount Type */}
              <div>
                <label className="text-sm text-zinc-400 mb-1 block">Discount Type</label>
                <div className="flex gap-2">
                  {["Percentage", "Flat", "Shipping"].map((type) => (
                    <button
                      key={type}
                      onClick={() => setNewCoupon({ ...newCoupon, type })}
                      className={`flex-1 py-2 rounded-xl border ${newCoupon.type === type
                          ? "bg-indigo-500/20 border-indigo-500 text-indigo-400"
                          : "border-white/10 text-zinc-400"
                        }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Discount Value */}
              <div>
                <label className="text-sm text-zinc-400 mb-1 block">
                  Discount {newCoupon.type === "Percentage" ? "(%)" : newCoupon.type === "Shipping" ? "" : "(₹)"}
                </label>
                <input
                  placeholder={newCoupon.type === "Shipping" ? "Free" : "e.g. 20"}
                  value={newCoupon.discount}
                  onChange={(e) =>
                    setNewCoupon({ ...newCoupon, discount: e.target.value })
                  }
                  className="w-full bg-zinc-800 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Min Order & Max Usage */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-zinc-400 mb-1 block">Min Order (₹)</label>
                  <input
                    placeholder="e.g. 500"
                    value={newCoupon.minOrder}
                    onChange={(e) =>
                      setNewCoupon({ ...newCoupon, minOrder: e.target.value })
                    }
                    className="w-full bg-zinc-800 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="text-sm text-zinc-400 mb-1 block">Max Usage</label>
                  <input
                    placeholder="e.g. 100"
                    value={newCoupon.maxUsage}
                    onChange={(e) =>
                      setNewCoupon({ ...newCoupon, maxUsage: e.target.value })
                    }
                    className="w-full bg-zinc-800 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              {/* Valid Until */}
              {/* Valid Until */}
              <div>
                <label className="text-sm text-zinc-400 mb-1 block">
                  Valid Until
                </label>
                <input
                  type="date"
                  value={newCoupon.validUntil}
                  onChange={(e) =>
                    setNewCoupon({
                      ...newCoupon,
                      validUntil: e.target.value,
                    })
                  }
                  className="w-full bg-zinc-800 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Description */}
              <div>
                <label className="text-sm text-zinc-400 mb-1 block">
                  Description
                </label>
                <textarea
                  rows={3}
                  placeholder="Describe this coupon..."
                  value={newCoupon.description}
                  onChange={(e) =>
                    setNewCoupon({
                      ...newCoupon,
                      description: e.target.value,
                    })
                  }
                  className="w-full bg-zinc-800 rounded-xl px-4 py-3 resize-none outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-3 pt-2">
                <button
                  onClick={handleCloseModal}
                  className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-xl transition"
                >
                  Cancel
                </button>

                <button
                  onClick={handleCreateCoupon}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-xl transition"
                >
                  {editId ? "Update Coupon" : "Create Coupon"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}