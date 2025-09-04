// src/services/api.js
import axios from "axios";

const API_BASE_URL = " https://1b9bf8f808c9.ngrok-free.app/api";

// ✅ Create axios client
const apiClient = axios.create({ baseURL: API_BASE_URL });

// ✅ Attach token to every request
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("farm_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      delete config.headers.Authorization;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Centralized request handler
// ✅ Centralized request handler
const handleRequest = async (request) => {
  try {
    const res = await request;
    return res.data;
  } catch (err) {
    const status = err.response?.status;
    const errorMsg =
      err.response?.data?.message ||
      err.response?.data?.error ||
      err.message ||
      "Server error";

    console.error(`❌ API Error [${status || "no-status"}]:`, errorMsg);

    // Always throw a real Error
    throw new Error(errorMsg);
  }
};


// ---------- API methods ----------
const api = {
  // ---------- Auth ----------
  login: (credentials) =>
    handleRequest(apiClient.post("/auth/login", credentials)),
  signup: (data) =>
    handleRequest(apiClient.post("/auth/signup", data)),

  // ---------- Production ----------
  getProduction: async () => {
    const data = await handleRequest(apiClient.get("/production"));
    return Array.isArray(data) ? data : []; // always array
  },
  addProduction: (data) =>
    handleRequest(apiClient.post("/production", data)),

  // ---------- Prices ----------
  getCurrentPrices: async () => {
    const data = await handleRequest(apiClient.get("/prices"));
    return Array.isArray(data) ? data : [];
  },
  updatePrice: (product, price) =>
    handleRequest(apiClient.put(`/prices/${product}`, { price })),

  // ---------- Income ----------
  getMonthlyIncome: async () => {
    const data = await handleRequest(apiClient.get("/production/income/monthly"));
    return Array.isArray(data) ? data : [];
  },
  getCurrentMonthIncome: async () => {
    const data = await handleRequest(apiClient.get("/production/income/current"));
    return data && typeof data === "object" ? data : { total: 0 };
  },
  getIncomeByProductMonthly: async () => {
    const data = await handleRequest(apiClient.get("/production/income/by-product"));
    return Array.isArray(data) ? data : [];
  },
  getTodayIncome: async () => {
    const data = await handleRequest(apiClient.get("/production/income/today"));
    return data && typeof data === "object" ? data : { total: 0 };
  },

  // ---------- Dashboard ----------
  getTodayProductsCount: async () => {
    const data = await handleRequest(apiClient.get("/production/today-products-count"));
    return typeof data === "number" ? data : 0;
  },
};

export default api;
