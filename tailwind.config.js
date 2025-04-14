/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./screens/**/*.{js,jsx,ts,tsx}", "./screens/home/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}", "./screens/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'gray-50': '#f9fafb',
        'gray-800': '#1f2937',
        'blue-500': '#3b82f6',
      },
    },
  },
  plugins: [],
}