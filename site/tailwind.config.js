/** @type {import('tailwindcss').Config} */
import fluid, { extract, screens, fontSize } from "fluid-tailwind";

module.exports = {
  content: {
    files: ["**/*.webc", "./.eleventy.js"],
    extract,
  },

  theme: {
    screens,
    fontSize,
    container: {
      center: true,
      padding: "1rem",
    },
    extend: {
      colors: {
        "twilight": "#dcbfd2",
        "periwinkle": "#7987d6",
        "grape": "#3b2153",
        "tawny-port": "#6f203b",
        "pine-glade": "#cacf8a",
        "crete": "#678a31",
        "gold": "#FFE6CC",
        transparent: "transparent",
      },
      fontFamily: {
        sans: ["Helvetica", "sans-serif"],
        cursive: ["Arizonia", "cursive"],
      },
    },
  },

  plugins: [fluid],
};
