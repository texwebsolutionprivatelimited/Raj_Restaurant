"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

const API_URL = "http://localhost:3000/api";

export const useAuthStore = create()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      token: null,
      loading: false,
      error: null,

      login: async (email, password) => {
        console.log("LOGIN BODY:", { email, password });
        set({ loading: true, error: null });

        try {
          // Try admin login first
          let res = await fetch(`${API_URL}/auth/admin/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
          });

          let data = await res.json();

          // If admin login fails, try customer login
          if (!data.token) {
            res = await fetch(`${API_URL}/auth/login`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                email,
                //phone: email.includes("+") ? email : "",
                password
              }),
            });
            data = await res.json();
          }

          if (!data.token) {
            throw new Error(data.message || "Invalid email or password");
          }

          // Save token based on role
          if (data.role === "admin") {
            localStorage.setItem("adminToken", data.token);
            localStorage.setItem("role", "admin");   // 🔥 ADD THIS
          } else {
            localStorage.setItem("userToken", data.token);
            localStorage.setItem("role", "user");    // 🔥 ADD THIS
          }

          set({
            user: data,
            token: data.token,
            isAuthenticated: true,
            loading: false,
          });

          return data;
        } catch (error) {
          set({
            loading: false,
            error: error.message || "Login failed"
          });
          throw error;
        }
      },

      signup: async (name, email, phone, password) => {
          console.log("SIGNUP DATA:", { name, email, password });
        set({ loading: true, error: null });

        try {
          const res = await fetch(`${API_URL}/auth/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name,
              email,
              phone,
              password
            }),
          });

          const data = await res.json();

          if (data.message === "User already exists") {
            throw new Error("User already exists");
          }

          if (!data.token) {
            throw new Error(data.message || "Registration failed");
          }

          localStorage.setItem("userToken", data.token);
          localStorage.setItem("role", "user");
          set({
            user: data,
            token: data.token,
            isAuthenticated: true,
            loading: false,
          });

          return data;
        } catch (error) {
          set({
            loading: false,
            error: error.message || "Registration failed"
          });
          throw error;
        }
      },

      logout: () => {
        const { user } = get();

        // Remove appropriate token
        if (user?.role === "admin") {
          localStorage.removeItem("adminToken");
        } else {
          localStorage.removeItem("userToken");
        }

        localStorage.removeItem("adminToken");
        localStorage.removeItem("userToken");

        set({
          user: null,
          isAuthenticated: false,
          token: null,
          error: null,
        });
      },

      checkAuth: () => {
        const adminToken = localStorage.getItem("adminToken");
        const userToken = localStorage.getItem("userToken");
        const savedUsers = localStorage.getItem("users");

        if (adminToken || userToken) {
          try {
            const users = savedUsers ? JSON.parse(savedUsers) : {};
            // Set basic auth state (in real app, verify token with backend)
            set({
              isAuthenticated: true,
              token: adminToken || userToken,
            });
          } catch (e) {
            console.error("Auth check failed:", e);
          }
        }
      },

      setUser: (user) => {
        set({ user, isAuthenticated: !!user });
      },
    }),
    {
      name: "auth-storage",
    },
  ),
);