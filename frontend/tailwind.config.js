/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        outfit: ['Outfit', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
        shadow: ['Shadows Into Light', 'cursive'],
        pacifico: ['Pacifico', 'cursive'],
      },
    },
  },
  plugins: [],
}