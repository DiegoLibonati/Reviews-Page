/** @type {import('tailwindcss').Config} */

const config = {
  content: ["./index.html", "./src/**/*.{ts,js}"],
  theme: {
    extend: {
      colors: {
        background: "#128CF0",
        primary: "#118DEF",
        secondary: "#E7CA46",
        white: "#ffffff",
        black: "#000000",
      },
      fontFamily: {
        primary: ["Roboto", "Helvetica", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
