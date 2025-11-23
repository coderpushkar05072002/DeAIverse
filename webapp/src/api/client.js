import axios from "axios";

const baseURL = import.meta.env.VITE_BACKEND_URL || "http://127.0.0.1:5001";

const client = axios.create({
  baseURL,
  timeout: 10000,
});

export default client;
