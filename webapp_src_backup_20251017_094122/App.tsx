import React, { useState } from "react";
import Header from "./components/Header";
import ConsumerDashboard from "./pages/ConsumerDashboard";
import ProviderDashboard from "./pages/ProviderDashboard";
import { motion } from "framer-motion";

export default function App() {
  const [page, setPage] = useState("consumer");

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white">
      <Header />\n      <Hero />
      <main className="flex flex-col items-center py-12">
        <div className="flex gap-4 mb-8">
          {["consumer", "provider"].map((type) => (
            <button
              key={type}
              onClick={() => setPage(type)}
              className={`px-5 py-2 rounded-full font-medium transition-all duration-300 ${
                page === type
                  ? "bg-gradient-to-r from-[#6366f1] to-[#60a5fa] shadow-[0_0_15px_rgba(99,102,241,0.5)] scale-105"
                  : "bg-[rgba(255,255,255,0.08)] text-gray-300 hover:scale-105"
              }`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>

        <motion.div
          key={page}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-[90%] max-w-3xl bg-[rgba(30,41,59,0.6)] backdrop-blur-xl rounded-2xl p-8 shadow-[0_10px_40px_rgba(0,0,0,0.3)] border border-[rgba(255,255,255,0.1)]"
        >
          {page === "consumer" ? <ConsumerDashboard /> : <ProviderDashboard />}
        </motion.div>
      </main>
    </div>
  );
}

