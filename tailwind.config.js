/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html"],
  theme: {
    extend: {
      colors: {
        primary: '#1a1a1a',
        secondary: '#4a90e2',
        accent: '#f39c12',
      },
      fontFamily: {
        sans: ['Noto Sans JP', 'sans-serif'],
      }
    },
  },
  plugins: [],
}