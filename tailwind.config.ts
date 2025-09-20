import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./*.{html,js,ts,jsx,tsx}", "./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#128CF0",
        primary: "#118DEF",
        secondary: "#E7CA46",
        white: "#FFFFFF",
        black: "#000000",
      },
    },
  },
  plugins: [],
};

export default config;
