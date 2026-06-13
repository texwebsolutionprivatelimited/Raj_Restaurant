const API_URL = "http://localhost:3000/api";

// Auth API
export const authAPI = {
  // Admin Login
  adminLogin: async (email, password) => {
    const res = await fetch(`${API_URL}/auth/admin/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    return res.json();
  },

  // Customer Login
  login: async (email, phone, password) => {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, phone, password }),
    });
    return res.json();
  },

  // Customer Register
  register: async (name, email, phone, password) => {
    const res = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, phone, password }),
    });
    return res.json();
  },
};

// Menu API
export const menuAPI = {
  // Get all menu
  getMenu: async () => {
    const res = await fetch(`${API_URL}/menu`);
    return res.json();
  },

  // Add menu (admin)
  addMenu: async (data, token) => {
    const res = await fetch(`${API_URL}/admin/menu`, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  // Update menu
  updateMenu: async (id, data, token) => {
    const res = await fetch(`${API_URL}/admin/menu/${id}`, {
      method: "PUT",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  // Delete menu
  deleteMenu: async (id, token) => {
    const res = await fetch(`${API_URL}/admin/menu/${id}`, {
      method: "DELETE",
      headers: { "Authorization": `Bearer ${token}` },
    });
    return res.json();
  },
};

// Order API
export const orderAPI = {
  // Get all orders (admin)
  getOrders: async (token) => {
    const res = await fetch(`${API_URL}/admin/orders`, {
      headers: { "Authorization": `Bearer ${token}` },
    });
    return res.json();
  },

  // Place order
  placeOrder: async (orderData) => {
    const res = await fetch(`${API_URL}/orders`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderData),
    });
    return res.json();
  },

  // Update order status
  updateStatus: async (id, status, token) => {
    const res = await fetch(`${API_URL}/admin/orders/${id}/status`, {
      method: "PUT",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({ status }),
    });
    return res.json();
  },
};

// Customer API
export const customerAPI = {
  // Get all customers (admin)
  getCustomers: async (token) => {
    const res = await fetch(`${API_URL}/admin/customers`, {
      headers: { "Authorization": `Bearer ${token}` },
    });
    return res.json();
  },
};

// Stats API
export const statsAPI = {
  get: async (token) => {
    const res = await fetch(`${API_URL}/admin/stats`, {
      headers: { "Authorization": `Bearer ${token}` },
    });
    return res.json();
  },
};