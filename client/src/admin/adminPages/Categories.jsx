import { useState, useEffect } from "react";
import { Plus, Trash2, Edit, Search, X, Upload, UtensilsCrossed, Coffee, Cake, ChefHat, Soup, Pizza } from "lucide-react";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editCategory, setEditCategory] = useState(null);
  const [preview, setPreview] = useState(null);
  const [newCategory, setNewCategory] = useState({
    name: "",
    description: "",
    icon: "ChefHat",
    image: null,
  });

  // Sample categories data with more details
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/categories");
        const data = await res.json();
        setCategories(data);
      } catch (err) {
        console.error("Error fetching categories:", err);
        setCategories([]);
      }
    };

    fetchCategories();
  }, []);

  // Filter categories
  const filteredCategories = categories.filter((cat) =>
    (cat?.name || "").toLowerCase().includes(search.toLowerCase())
  );

  /*
  const handleAdd = () => {
    if (!newCategory.name.trim()) {
      alert("Please enter category name");
      return;
    }

    if (editCategory) {
      setCategories(categories.map((cat) =>
        cat.id === editCategory.id
          ? {
            ...cat,
            name: newCategory.name,
            description: newCategory.description,
            icon: newCategory.icon,
            image: newCategory.image ? URL.createObjectURL(newCategory.image) : cat.image,
          }
          : cat
      ));
    } else {
      const category = {
        id: Date.now(),
        name: newCategory.name,
        description: newCategory.description,
        icon: newCategory.icon,
        itemCount: 0,
        image: newCategory.image ? URL.createObjectURL(newCategory.image) : null,
      };
      setCategories([...categories, category]);
    }

    setShowModal(false);
    setNewCategory({ name: "", description: "", icon: "ChefHat", image: null });
    setEditCategory(null);
    setPreview(null);
  };*/

  const handleAdd = async () => {
    console.log("newCategory =", newCategory);

    const formData = new FormData();

    formData.append("name", newCategory.name);
    formData.append("description", newCategory.description);
    formData.append("icon", newCategory.icon);

    if (newCategory.image) {
      formData.append("image", newCategory.image);
    }

    for (const [key, value] of formData.entries()) {
      console.log(key, value);
    }

    const res = await fetch("http://localhost:3000/api/categories", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    console.log("STATUS:", res.status);
    console.log("RESPONSE:", data);
  };

  const handleEdit = (cat) => {
    setEditCategory(cat);

    setNewCategory({
      name: cat.name || "",
      description: cat.description || "",
      icon: cat.icon || "ChefHat",
      image: null,
    });

    setShowModal(true);
  };

  const handleUpdate = async () => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/categories/${editCategory._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newCategory),
        }
      );

      const data = await res.json();

      setCategories((prev) =>
        prev.map((c) => (c._id === data._id ? data : c))
      );

      setShowModal(false);
      setEditCategory(null);

    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this category?")) return;

    try {
      await fetch(`http://localhost:3000/api/categories/${id}`, {
        method: "DELETE",
      });

      setCategories((prev) => prev.filter((c) => c._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const getIcon = (iconName) => {
    switch (iconName) {
      case "UtensilsCrossed":
        return <UtensilsCrossed size={24} />;
      case "Coffee":
        return <Coffee size={24} />;
      case "Cake":
        return <Cake size={24} />;
      case "Soup":
        return <Soup size={24} />;
      case "Pizza":
        return <Pizza size={24} />;
      default:
        return <ChefHat size={24} />;
    }
  };

  return (
    <div className="mt-2 px-2 md:px-0">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl md:text-4xl font-semibold">
            Categories
          </h1>
          <p className="text-zinc-500 text-sm mt-1">
            Manage food categories
          </p>
        </div>

        <button
          onClick={() => {
            setEditCategory(null);
            setNewCategory({ name: "", description: "", icon: "ChefHat", image: null });
            setPreview(null);
            setShowModal(true);
          }}
          className="bg-indigo-500 hover:bg-indigo-600 transition px-4 py-2 rounded-xl flex items-center gap-2 text-sm font-medium"
        >
          <Plus size={18} />
          Add Category
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <div className="bg-zinc-900/60 border border-white/10 rounded-2xl p-5">
          <p className="text-zinc-400 text-sm">Total Categories</p>
          <p className="text-2xl font-semibold mt-1">{categories.length}</p>
        </div>
        <div className="bg-zinc-900/60 border border-white/10 rounded-2xl p-5">
          <p className="text-zinc-400 text-sm">Total Items</p>
          <p className="text-2xl font-semibold mt-1">
            {categories.reduce((acc, cat) => acc + cat.itemCount, 0)}
          </p>
        </div>
        <div className="bg-zinc-900/60 border border-white/10 rounded-2xl p-5">
          <p className="text-zinc-400 text-sm">Active Categories</p>
          <p className="text-2xl font-semibold mt-1 text-green-400">
            {categories.filter(cat => cat.active === true).length}
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="relative mb-6 max-w-md">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
          size={18}
        />
        <input
          type="text"
          placeholder="Search categories..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-zinc-900/60 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white outline-none focus:border-indigo-500 transition"
        />
      </div>

      {/* Category List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCategories.map((cat) => (
          <div
            key={cat._id}
            className="bg-zinc-900 border border-white/10 rounded-2xl p-5 hover:bg-zinc-800 transition hover:scale-[1.02]"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="w-14 h-14 bg-indigo-500/10 rounded-xl flex items-center justify-center text-indigo-400">
                {cat.image ? (
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover rounded-xl"
                  />
                ) : (
                  getIcon(cat.icon)
                )}
              </div>

              <div className="flex gap-1">
                <button
                  onClick={() => handleEdit(cat)}
                  className="p-2 hover:bg-white/10 rounded-lg transition"
                >
                  <Edit size={16} />
                </button>
                <button
                  onClick={() => handleDelete(cat._id)}
                  className="p-2 hover:bg-red-500/10 text-red-400 rounded-lg transition"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>

            <h3 className="text-lg font-semibold">{cat.name}</h3>
            <p className="text-zinc-400 text-sm mt-1">{cat.description}</p>
            <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between">
              <span className="text-zinc-500 text-sm">{cat.itemCount} items</span>
              <span className="px-2 py-1 text-xs bg-indigo-500/10 text-indigo-400 rounded-lg">
                Active
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-lg flex items-center justify-center z-50 p-4">
          <div className="bg-zinc-900/90 backdrop-blur-xl w-full max-w-md rounded-2xl p-6 border border-white/10 shadow-2xl">
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-xl font-semibold">
                {editCategory ? "Edit Category" : "Add Category"}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 hover:bg-zinc-800 rounded-lg transition"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              {/* Category Name */}
              <div>
                <label className="text-sm text-zinc-400 mb-1 block">Category Name *</label>
                <input
                  type="text"
                  placeholder="Enter category name"
                  value={newCategory.name}
                  onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                  className="w-full bg-zinc-800 rounded-xl px-4 py-3 text-white outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Description */}
              <div>
                <label className="text-sm text-zinc-400 mb-1 block">Description</label>
                <textarea
                  placeholder="Describe this category..."
                  value={newCategory.description}
                  onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                  rows={3}
                  className="w-full bg-zinc-800 rounded-xl px-4 py-3 text-white outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                />
              </div>

              {/* Icon Selection */}
              <div>
                <label className="text-sm text-zinc-400 mb-1 block">Icon ({newCategory.icon})
                </label>
                <div className="flex gap-2 flex-wrap">
                  {["ChefHat", "UtensilsCrossed", "Soup", "Pizza", "Coffee", "Cake"].map((icon) => (
                    <button
                      key={icon}
                      onClick={() => setNewCategory({ ...newCategory, icon })}
                      className={`p-3 rounded-xl border ${newCategory.icon === icon
                        ? "bg-indigo-500/20 border-indigo-500 text-indigo-400"
                        : "border-white/10 text-zinc-400"
                        }`}
                    >
                      {getIcon(icon)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Image Upload */}
              <div>
                <label className="text-sm text-zinc-400 mb-1 block">Category Image</label>
                <div className="border-2 border-dashed border-zinc-700 rounded-xl p-5 text-center hover:border-indigo-500 transition">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    id="category-image"
                    onChange={(e) => {
                      const file = e.target.files?.[0];

                      if (file) {
                        setNewCategory({
                          ...newCategory,
                          image: file, // store FILE, not value
                        });

                        setPreview(URL.createObjectURL(file));
                      }
                    }}
                  />
                  <label htmlFor="category-image" className="cursor-pointer block">
                    <Upload className="mx-auto text-zinc-400 mb-2" size={24} />
                    <p className="text-zinc-300 text-sm">Click to upload image</p>
                    <p className="text-zinc-500 text-xs">PNG, JPG, JPEG</p>
                  </label>
                  {preview && (
                    <div className="mt-4">
                      <img
                        src={preview}
                        alt="preview"
                        className="h-24 w-full object-cover rounded-lg"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-xl transition"
              >
                Cancel
              </button>
              <button
                onClick={editCategory ? handleUpdate : handleAdd}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-xl transition"
              >
                {editCategory ? "Update" : "Add"} Category
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}