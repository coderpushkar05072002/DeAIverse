import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      // send these paths to the backend running on 127.0.0.1:5001
      "/health": { target: "http://127.0.0.1:5001", changeOrigin: true, secure: false },
      "/tasks":  { target: "http://127.0.0.1:5001", changeOrigin: true, secure: false },
      "/approve":{ target: "http://127.0.0.1:5001", changeOrigin: true, secure: false }
    }
  }
});
