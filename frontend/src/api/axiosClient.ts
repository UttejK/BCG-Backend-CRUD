import axios from "axios";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.request.use((config) => {
  const username = import.meta.env.VITE_API_USERNAME;
  const password = import.meta.env.VITE_API_PASSWORD;

  if (username && password) {
    const token = btoa(`${username}:${password}`);
    config.headers["Authorization"] = `Basic ${token}`;
  }

  return config;
});

export default axiosClient;
