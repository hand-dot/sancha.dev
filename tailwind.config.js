/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html", "./events/**/*.html"],
  theme: {
    extend: {
      colors: {
        primary: "#1a1a1a",
        secondary: "#79b94e",
        accent: "#f39c12",
      },
      fontFamily: {
        sans: ["Noto Sans JP", "sans-serif"],
      },
    },
  },
  plugins: [],
};
