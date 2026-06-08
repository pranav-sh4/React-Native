/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}"
  ],
  presets: [require("nativewind/preset")], // <-- Required for NativeWind v4
  theme: {
    extend: {
      colors: {
        primary: '#0f172a',
        secondary: '#64748b',
        background: '#f8fafc',
        surface: '#ffffff',
      }
    },
  },
  plugins: [],
}