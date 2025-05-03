module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'blue-50': '#f0f9ff',
        'blue-100': '#e0f2fe',
        'blue-800': '#1e40af',
        'green-100': '#dcfce7',
        'green-800': '#166534',
        'purple-50': '#faf5ff',
        'purple-100': '#f3e8ff',
        'purple-200': '#e9d5ff',
        'purple-700': '#7e22ce',
        'purple-800': '#6b21a8',
        'gray-100': '#f3f4f6',
        'gray-600': '#4b5563',
        'gray-700': '#374151',
        'gray-800': '#1f2937',
      },
      borderRadius: {
        'lg': '0.5rem',
        'xl': '0.75rem',
      },
      boxShadow: {
        'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      },
    },
  },
  plugins: [],
};
