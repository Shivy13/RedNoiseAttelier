/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './pages/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#fbfbfd',
          100: '#f6f7fb',
          200: '#eef2f8',
          300: '#c7d0df',
          400: '#94a3b8',
          500: '#475569',
          700: '#111827',
          900: '#0b1220'
        },
        accent: {
          DEFAULT: '#ffb347',
          600: '#ff9f1a'
        }
      },
      fontFamily: {
        sans: ['Poppins', ...defaultTheme.fontFamily.sans],
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '1.5rem',
          lg: '2rem',
        },
      },
      boxShadow: {
        'card': '0 6px 18px rgba(15, 23, 42, 0.08)'
      }
    },
  },
  plugins: [
    // Add official plugins here if you install them, e.g.
    // require('@tailwindcss/forms'),
    // require('@tailwindcss/aspect-ratio'),
  ],
}
