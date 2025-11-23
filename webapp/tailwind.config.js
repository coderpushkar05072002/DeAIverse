/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#6366f1",
          dark: "#4f46e5",
          light: "#a5b4fc",
        },
        background: "#0f172a",
        card: "#1e293b",
        accent: "#60a5fa",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "-apple-system", "Segoe UI", "Roboto"],
      },
      boxShadow: {
        glow: "0 0 10px rgba(99,102,241,0.18)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
