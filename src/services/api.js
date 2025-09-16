import axios from "axios";

// Detect environment (localhost vs production)
// Detect environment (localhost vs production)
const isLocalhost =
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1";

// ✅ Point to backend API
const API_BASE_URL = isLocalhost
  ? "http://localhost:5000/api"          // dev
  : "https://api.myfarmstead.link/api";  // prod

// ✅ Create axios client
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

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
    throw new Error(errorMsg);
  }
};

// ---------- API methods ----------
const api = {
  // Auth
// Auth
login: async (credentials) => {
  const data = await handleRequest(apiClient.post("/auth/login", credentials));

  // ✅ Save JWT + user in localStorage
  if (data?.token) {
    localStorage.setItem("farm_token", data.token);
    localStorage.setItem("farm_user", JSON.stringify(data.user));
  }

  return data;
},

  signup: (data) =>
    handleRequest(apiClient.post("/auth/signup", data)),

  // Production
  getProduction: async () => {
    const data = await handleRequest(apiClient.get("/production"));
    return Array.isArray(data) ? data : [];
  },
  addProduction: (data) =>
    handleRequest(apiClient.post("/production", data)),

  // Prices
  getCurrentPrices: async () => {
    const data = await handleRequest(apiClient.get("/prices"));
    return Array.isArray(data) ? data : [];
  },
  updatePrice: (product, price) =>
    handleRequest(apiClient.put(`/prices/${product}`, { price })),

  // Income
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

  // Dashboard
  getTodayProductsCount: async () => {
    const data = await handleRequest(apiClient.get("/production/today-products-count"));
    return typeof data === "number" ? data : 0;
  },
};

export default api;
