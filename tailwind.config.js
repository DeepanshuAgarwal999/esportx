/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,tsx,ts,jsx}", "./components/**/*.{js,jsx,ts,tsx}", "./screens/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  darkMode:"class",
  theme: {
    extend: {},
  },
  plugins: [],
};
