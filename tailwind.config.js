/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        hegimeda: ['Hegimeda', 'sans-serif'],
        volkhov: ['Volkhov', 'serif'],
      },
      colors: {
        'primary': '#FD9222',
        'secondary': '#5e6282',
      }
    },
  },
  plugins: [],
}

