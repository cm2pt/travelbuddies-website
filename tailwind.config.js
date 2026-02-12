/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#022f59",
        navy: "#1e2d3c",
        teal: "#7fb9b7",
        tealSoft: "#cfe8e4",
        blush: "#e7b0a4",
        cream: "#efe7cf",
      },
      fontFamily: {
        display: ["More Sugar", "Baloo 2", "cursive"],
        body: ["Josefin Sans", "sans-serif"],
        sans: ["Josefin Sans", "sans-serif"],
      },
      boxShadow: {
        soft: "0 20px 60px rgba(2, 47, 89, 0.12)",
        card: "0 10px 30px rgba(2, 47, 89, 0.08)",
      },
    },
  },
  plugins: [],
}
