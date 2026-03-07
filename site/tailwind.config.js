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
    colors: {
      "michigan-blue": "#00274c",
      "michigan-maize": "#ffcb05",
      transparent: "transparent",
    },

    extend: {},
  },

  plugins: [fluid],
};
