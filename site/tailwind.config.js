/** @type {import('tailwindcss').Config} */
import fluid, { extract, screens, fontSize } from "fluid-tailwind";

module.exports = {
  content: {
    files: ["**/*.webc", "../studio/schemas/**/*.js", "./.eleventy.js"],
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
      animation: {
        "clip-scale":
          "clip-scale 1s forwards 0.25s cubic-bezier(.46,-0.05,.07,1.01)",
      },
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
        roboto: ["Roboto", "sans-serif"],
        cursive: ["Arizonia", "cursive"],
      },
      keyframes: {
        "clip-scale": {
          "0%": {
            "clip-path": "inset(100% 100% 0 0)",
            transform: "scale(1.25)",
            opacity: 1,
          },
          "100%": {
            "clip-path": "inset(0 0 0 0)",
            transform: "scale(1)",
            opacity: 1,
          },
        },
      },
    },
  },

  plugins: [fluid],
};
