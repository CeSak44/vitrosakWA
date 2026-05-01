/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-navy': '#001A33',
        'brand-blue': '#0066FF',
        'brand-steel': '#A3B1C6',
        'brand-light': '#F5F8FA',
      },
      fontFamily: {
        industry: ['Industry', 'sans-serif'],
      }
    },
  },
  plugins: [
    require('tailwindcss-animate'),
  ],
}

