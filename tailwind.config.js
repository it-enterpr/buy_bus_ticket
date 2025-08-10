/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          '500': '#0052cc', // Vaše hlavní barva
          '600': '#0041a3', // Tmavší odstín pro hover
          '700': '#00317a', // Ještě tmavší
        },
      },
    },
  },
  plugins: [],
}
