module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: '#4f46e5',
        secondary: '#10b981',
        background: '#f7fafc',
        card: '#ffffff',
        textPrimary: '#1a202c',
        textSecondary: '#4a5568',
      },
      spacing: {
        '72': '18rem',
        '84': '21rem',
        '96': '24rem',
      },
      borderRadius: {
        'xl': '0.75rem',
        '2xl': '1rem',
      },
    },
  },
  variants: {
    extend: {
      opacity: ['disabled'],
      backgroundColor: ['active'],
    },
  },
  plugins: [],
};
