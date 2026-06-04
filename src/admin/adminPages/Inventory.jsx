import { useState, useEffect } from "react";
import { Search, Plus, Edit, Trash2, X } from "lucide-react";

export default function Inventory() {
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [preview, setPreview] = useState(null);

  const [newItem, setNewItem] = useState({
    name: "",
    category: "",
    price: "",
    discount: "",
    stock: "",
    description: "",
    highlights: "",
    specifications: "",
    image: null,
  });
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");

  const categories = [
    "Starters",
    "Main Course",
    "Rice",
    "Breads",
    "Desserts",
    "Beverages",
    "Fast Food",
    "South Indian",
    "Chinese",
  ];

  useEffect(() => {
    setItems([
      {
        id: 1,
        name: "Butter Chicken",
        category: "Main Course",
        price: "₹350",
        discount: "10%",
        stock: 25,
        status: "In Stock",
        description: "Creamy chicken curry with rich gravy",
        highlights: "Rich in protein, creamy texture",
        specifications: "Weight: 300g, Spice level: Medium",
        image: null,
      },
      {
        id: 2,
        name: "Paneer Tikka",
        category: "Starters",
        price: "₹250",
        discount: "₹50",
        stock: 30,
        status: "In Stock",
        description: "Grilled paneer cubes with spices",
        highlights: "Vegetarian, high protein",
        specifications: "Weight: 200g, Grill roasted",
        image: null,
      },
      {
        id: 3,
        name: "Chicken Biryani",
        category: "Rice",
        price: "₹300",
        discount: "",
        stock: 15,
        status: "Low Stock",
        description: "Aromatic basmati rice with chicken",
        highlights: "Aged basmati rice, aromatic spices",
        specifications: "Weight: 400g, Serves 1",
        image: null,
      },
      {
        id: 4,
        name: "Dal Makhani",
        category: "Main Course",
        price: "₹200",
        discount: "",
        stock: 0,
        status: "Out of Stock",
        description: "Slow cooked black lentils",
        highlights: "Vegetarian, high fiber",
        specifications: "Weight: 250g, Slow cooked for 8 hours",
        image: null,
      },
      {
        id: 5,
        name: "Tandoori Roti",
        category: "Breads",
        price: "₹30",
        discount: "",
        stock: 100,
        status: "In Stock",
        description: "Clay oven baked bread",
        highlights: "Whole wheat, baked in tandoor",
        specifications: "Weight: 80g, Cooked in tandoor",
        image: null,
      },
      {
        id: 6,
        name: "Gulab Jamun",
        category: "Desserts",
        price: "₹80",
        discount: "₹20",
        stock: 20,
        status: "Low Stock",
        description: "Deep fried milk solids in sugar syrup",
        highlights: "Sweet, soft texture",
        specifications: "2 pieces per serving",
        image: null,
      },
      {
        id: 7,
        name: "Masala Papad",
        category: "Starters",
        price: "₹60",
        discount: "",
        stock: 50,
        status: "In Stock",
        description: "Roasted papad with spices",
        highlights: "Crispy, spicy",
        specifications: "1 piece per serving",
        image: null,
      },
    ]);
  }, []);

  const filtered = items.filter(
    (i) =>
      i.name.toLowerCase().includes(search.toLowerCase()) ||
      i.category.toLowerCase().includes(search.toLowerCase())
  );

  const stats = [
    { label: "Total Items", value: items.length },
    {
      label: "In Stock",
      value: items.filter((i) => i.status === "In Stock").length,
      color: "text-green-400",
    },
    {
      label: "Low Stock",
      value: items.filter((i) => i.status === "Low Stock").length,
      color: "text-yellow-400",
    },
    {
      label: "Out of Stock",
      value: items.filter((i) => i.status === "Out of Stock").length,
      color: "text-red-400",
    },
  ];

  const handleSaveItem = () => {
    if (!newItem.name || !newItem.category) {
      alert("Please fill all required fields");
      return;
    }

    const stock = Number(newItem.stock || 0);

    const status =
      stock <= 0
        ? "Out of Stock"
        : stock <= 20
        ? "Low Stock"
        : "In Stock";

    if (editId) {
      setItems(
        items.map((item) =>
          item.id === editId
            ? {
                ...item,
                name: newItem.name,
                category: newItem.category,
                price: `₹${newItem.price}`,
                discount: newItem.discount,
                stock,
                description: newItem.description,
                highlights: newItem.highlights,
                specifications: newItem.specifications,
                image: newItem.image
                  ? URL.createObjectURL(newItem.image)
                  : item.image,
                status,
              }
            : item
        )
      );
    } else {
      const item = {
        id: Date.now(),
        name: newItem.name,
        category: newItem.category,
        description: newItem.description,
        highlights: newItem.highlights,
        specifications: newItem.specifications,
        image: newItem.image
          ? URL.createObjectURL(newItem.image)
          : null,
        price: `₹${newItem.price}`,
        discount: newItem.discount,
        stock,
        status,
      };

      setItems([item, ...items]);
    }

    setShowModal(false);
    setEditId(null);
    setPreview(null);

    setNewItem({
      name: "",
      category: "",
      price: "",
      discount: "",
      stock: "",
      description: "",
      highlights: "",
      specifications: "",
      image: null,
    });
  };

  const handleEdit = (item) => {
    setEditId(item.id);

    setNewItem({
      name: item.name,
      category: item.category,
      price: item.price.replace("₹", ""),
      discount: item.discount || "",
      stock: item.stock,
      description: item.description || "",
      highlights: item.highlights || "",
      specifications: item.specifications || "",
      image: null,
    });

    setPreview(null);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (!window.confirm("Delete this item?")) return;

    setItems(items.filter((item) => item.id !== id));
  };

  return (
    <div className="mt-2 px-2 md:px-0">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl md:text-4xl font-semibold">Inventory</h1>
          <p className="text-zinc-500 text-sm mt-1">
            Manage restaurant stock & items
          </p>
        </div>

        <button
          onClick={() => {
            setEditId(null);
            setPreview(null);

            setNewItem({
              name: "",
              category: "",
              price: "",
              discount: "",
              stock: "",
              description: "",
              highlights: "",
              specifications: "",
              image: null,
            });

            setShowModal(true);
          }}
          className="bg-indigo-500 hover:bg-indigo-600 transition px-4 py-2 rounded-xl flex items-center gap-2 text-sm font-medium"
        >
          <Plus size={18} />
          Add Item
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((s, i) => (
          <div
            key={i}
            className="bg-zinc-900/60 border border-white/10 rounded-2xl p-5 hover:scale-[1.02] transition"
          >
            <p className="text-zinc-400 text-sm">{s.label}</p>
            <p className={`text-2xl font-semibold mt-1 ${s.color || "text-white"}`}>
              {s.value}
            </p>
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="relative mb-6 max-w-md">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
          size={18}
        />
        <input
          type="text"
          placeholder="Search items or category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-zinc-900/60 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white outline-none focus:border-indigo-500 transition"
        />
      </div>

      {/* Table */}
      <div className="bg-zinc-900/60 border border-white/10 rounded-2xl overflow-hidden">
        <div className="p-5 border-b border-white/10">
          <h2 className="text-lg font-medium">Stock Items</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead>
              <tr className="text-left text-zinc-400 text-sm">
                <th className="p-4">Item</th>
                <th className="p-4">Image</th>
                <th className="p-4">Category</th>
                <th className="p-4">Price</th>
                <th className="p-4">Discount</th>
                <th className="p-4">Stock</th>
                <th className="p-4">Status</th>
                <th className="p-4">Highlights</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((item) => (
                <tr
                  key={item.id}
                  className="border-t border-white/5 hover:bg-white/5 transition"
                >
                  <td className="p-4 font-medium">{item.name}</td>
                  <td className="p-4">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-12 w-12 rounded-lg object-cover"
                      />
                    ) : (
                      <div className="h-12 w-12 rounded-lg bg-zinc-800 flex items-center justify-center text-zinc-500 text-xs">
                        No IMG
                      </div>
                    )}
                  </td>
                  <td className="p-4 text-zinc-400">{item.category}</td>
                  <td className="p-4">{item.price}</td>
                  <td className="p-4">
                    {item.discount ? (
                      <span className="text-green-400 text-sm">{item.discount} OFF</span>
                    ) : (
                      <span className="text-zinc-500">-</span>
                    )}
                  </td>
                  <td className="p-4">{item.stock}</td>
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 text-xs rounded-full border
                        ${
                          item.status === "In Stock"
                            ? "bg-green-500/10 text-green-400 border-green-500/20"
                            : item.status === "Low Stock"
                            ? "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
                            : "bg-red-500/10 text-red-400 border-red-500/20"
                        }`}
                    >
                      {item.status}
                    </span>
                  </td>

                  <td className="p-4 max-w-[200px] truncate text-sm text-zinc-400">
                    {item.highlights}
                  </td>

                  <td className="p-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(item)}
                        className="p-2 rounded-lg hover:bg-white/10 transition"
                      >
                        <Edit size={16} />
                      </button>

                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-2 rounded-lg hover:bg-red-500/10 text-red-400 transition"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-lg flex items-center justify-center z-50 p-4">
          <div className="bg-zinc-900/90 backdrop-blur-xl w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl p-6 border border-white/10 shadow-2xl">
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-xl font-semibold">
                {editId ? "Edit Item" : "Add Item"}
              </h2>
              <button
                onClick={() => {
                  setShowModal(false);
                  setPreview(null);
                }}
                className="p-2 hover:bg-zinc-800 rounded-lg transition"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              {/* Item Name */}
              <div>
                <label className="text-sm text-zinc-400 mb-1 block">Item Name *</label>
                <input
                  placeholder="Enter item name"
                  value={newItem.name}
                  onChange={(e) =>
                    setNewItem({ ...newItem, name: e.target.value })
                  }
                  className="w-full bg-zinc-800 rounded-xl px-4 py-3 text-white outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Category Dropdown */}
              <div>
                <label className="text-sm text-zinc-400 mb-1 block">Category *</label>
                <select
                  value={newItem.category}
                  onChange={(e) =>
                    setNewItem({ ...newItem, category: e.target.value })
                  }
                  className="w-full bg-zinc-800 rounded-xl px-4 py-3 text-white outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              {/* Price & Discount */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-zinc-400 mb-1 block">Price (₹) *</label>
                  <input
                    placeholder="0"
                    value={newItem.price}
                    onChange={(e) =>
                      setNewItem({ ...newItem, price: e.target.value })
                    }
                    className="w-full bg-zinc-800 rounded-xl px-4 py-3 text-white outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="text-sm text-zinc-400 mb-1 block">Discount</label>
                  <input
                    placeholder="e.g. 10% or ₹50"
                    value={newItem.discount}
                    onChange={(e) =>
                      setNewItem({ ...newItem, discount: e.target.value })
                    }
                    className="w-full bg-zinc-800 rounded-xl px-4 py-3 text-white outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              {/* Stock */}
              <div>
                <label className="text-sm text-zinc-400 mb-1 block">Stock Quantity *</label>
                <input
                  placeholder="0"
                  type="number"
                  value={newItem.stock}
                  onChange={(e) =>
                    setNewItem({ ...newItem, stock: e.target.value })
                  }
                  className="w-full bg-zinc-800 rounded-xl px-4 py-3 text-white outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Description */}
              <div>
                <label className="text-sm text-zinc-400 mb-1 block">Description</label>
                <textarea
                  placeholder="Describe the food item..."
                  value={newItem.description}
                  onChange={(e) =>
                    setNewItem({
                      ...newItem,
                      description: e.target.value,
                    })
                  }
                  rows={3}
                  className="w-full bg-zinc-800 rounded-xl px-4 py-3 text-white outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                />
              </div>

              {/* Highlights */}
              <div>
                <label className="text-sm text-zinc-400 mb-1 block">Highlights</label>
                <textarea
                  placeholder="e.g. Rich in protein, creamy texture, Vegetarian..."
                  value={newItem.highlights}
                  onChange={(e) =>
                    setNewItem({
                      ...newItem,
                      highlights: e.target.value,
                    })
                  }
                  rows={2}
                  className="w-full bg-zinc-800 rounded-xl px-4 py-3 text-white outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                />
                              {/* Specifications */}
              <div>
                <label className="text-sm text-zinc-400 mb-1 block">
                  Specifications
                </label>
                <textarea
                  placeholder="e.g. Weight: 300g, Serves 1, Spice level: Medium"
                  value={newItem.specifications}
                  onChange={(e) =>
                    setNewItem({
                      ...newItem,
                      specifications: e.target.value,
                    })
                  }
                  rows={2}
                  className="w-full bg-zinc-800 rounded-xl px-4 py-3 text-white outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                />
              </div>

              {/* Image Upload */}
              <div>
                <label className="text-sm text-zinc-400 mb-1 block">
                  Upload Image
                </label>

                <div className="border-2 border-dashed border-zinc-700 rounded-xl p-5 text-center hover:border-indigo-500 transition">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    id="food-image"
                    onChange={(e) => {
                      const file = e.target.files?.[0];

                      setNewItem({
                        ...newItem,
                        image: file || null,
                      });

                      if (file) {
                        setPreview(URL.createObjectURL(file));
                      }
                    }}
                  />

                  <label htmlFor="food-image" className="cursor-pointer block">
                    <p className="text-zinc-300">
                      Click to Upload or Drag & Drop
                    </p>
                    <p className="text-zinc-500 text-sm mt-1">
                      PNG, JPG, JPEG
                    </p>
                  </label>

                  {preview && (
                    <div className="mt-4">
                      <img
                        src={preview}
                        alt="preview"
                        className="h-28 w-full object-cover rounded-lg"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* BUTTONS */}
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => {
                  setShowModal(false);
                  setPreview(null);
                }}
                className="px-4 py-2 bg-zinc-800 rounded-xl hover:bg-zinc-700 transition"
              >
                Cancel
              </button>

              <button
                onClick={handleSaveItem}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 transition rounded-xl"
              >
                {editId ? "Update Item" : "Add Item"}
              </button>
            </div>
          </div>
                  </div>
        </div>
      )}
    </div>
  );
} 