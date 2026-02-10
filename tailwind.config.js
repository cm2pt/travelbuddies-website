/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        navy: "#1e2d3c",
        teal: "#7fb9b7",
        tealSoft: "#cfe8e4",
        blush: "#e7b0a4",
        cream: "#efe7cf",
      },
      fontFamily: {
        display: ["Playfair Display", "serif"],
        sans: ["Manrope", "sans-serif"],
      },
      boxShadow: {
        soft: "0 20px 60px rgba(30, 45, 60, 0.12)",
        card: "0 10px 30px rgba(30, 45, 60, 0.08)",
      },
    },
  },
  plugins: [],
}
