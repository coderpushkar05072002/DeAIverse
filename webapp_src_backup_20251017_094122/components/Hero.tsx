import React from "react";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="w-full text-center py-24 bg-gradient-to-b from-transparent via-[rgba(255,255,255,0.03)] to-transparent">
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#818cf8] via-[#60a5fa] to-[#34d399]"
      >
        The Future of AI × Blockchain
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto"
      >
        DeAIverse connects compute providers and AI innovators through decentralized trust.
      </motion.p>
    </section>
  );
}
