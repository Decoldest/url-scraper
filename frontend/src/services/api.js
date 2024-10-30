import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const scrapeWebsite = async (url) => {
  try {
    const response = await api.post("/api/scrape", { url });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || "Failed to scrape website");
  }
};

export const analyzeContent = async (content, instructions) => {
  try {
    const response = await api.post("/api/analyze", { content, instructions });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || "Failed to analyze content");
  }
};

// Add interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error);
    return Promise.reject(error);
  },
);

export default api;
