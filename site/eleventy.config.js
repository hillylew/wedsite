import fs from "node:fs";
import dotenv from "dotenv";
import { toHTML } from "@portabletext/to-html";
import sanityClient from "./utils/sanityClient.js";
import imageUrlBuilder from "@sanity/image-url";
import pluginWebc from "@11ty/eleventy-plugin-webc";
import { EleventyHtmlBasePlugin } from "@11ty/eleventy";

// Set the path to the .env file.
dotenv.config({ path: "../.env" });

export default function (eleventyConfig) {
  // Watch style related files.
  eleventyConfig.addWatchTarget("./tailwind.config.js");
  eleventyConfig.addWatchTarget("./style.css");

  // Chokidar config.
  eleventyConfig.setChokidarConfig({
    usePolling: true,
    interval: 500,
  });

  // Files to pass through without modification.
  eleventyConfig.addPassthroughCopy({ "./icons": "./" });
  eleventyConfig.addPassthroughCopy("./js");
  eleventyConfig.addPassthroughCopy("./img");
  eleventyConfig.addPassthroughCopy("./fonts");

  // Shortcodes.
  eleventyConfig.addShortcode("currentYear", () => {
    return new Date().getFullYear();
  });

  // Plugins.
  eleventyConfig.addPlugin(EleventyHtmlBasePlugin, {
    baseHref: process.env.SITE_URL,
  });

  eleventyConfig.addPlugin(pluginWebc, {
    components: "_components/**/*.webc",
  });

  // Returns a short month name from a date string.
  eleventyConfig.addJavaScriptFunction("getShortMonth", (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      timeZone: "UTC",
    });
  });

  // Returns the day from a date string.
  eleventyConfig.addJavaScriptFunction("getDay", (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      day: "numeric",
      timeZone: "UTC",
    });
  });

  // Returns the year from a date string.
  eleventyConfig.addJavaScriptFunction("getYear", (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      timeZone: "UTC",
    });
  });

  // Returns a nicely formatted date from a date string.
  eleventyConfig.addJavaScriptFunction("getPrettyDate", (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
      timeZone: "UTC",
    });
  });

  // Converts Sanity portable text to HTML.
  eleventyConfig.addJavaScriptFunction(
    "portableToHTML",
    function (portableText) {
      return toHTML(portableText);
    },
  );

  // Main menu collection.
  eleventyConfig.addCollection("mainMenu", function (collectionApi) {
    // Grab all of the data.
    const allData = collectionApi.getAll();

    // Return the main menu items.
    return allData[0].data.mainMenu.sections;
  });

  // Image helper that grabs images from Sanity.
  eleventyConfig.addJavaScriptFunction(
    "imageHelper",
    async function (asset, width, height = false) {
      // Store preview state.
      const preview = eleventyConfig.globalData?.preview;

      // Create sanity client.
      const client = sanityClient(preview);

      // Build initial image.
      let builder = imageUrlBuilder(client).image(asset).width(width);

      // Crop to height if needed.
      if (height) {
        builder = builder.height(height);
      }

      // Generate the Sanity URL.
      const imageURL = builder.url();

      // Return the image URL if we're in preview mode.
      if (eleventyConfig.globalData?.preview) {
        return imageURL;
      }

      // Check if we're dealing with a SVG.
      if (asset.asset._ref.includes("svg")) {
        // Determine the filename.
        const filename = `${asset.asset._ref}.svg`;

        // Fetch the SVG.
        const response = await fetch(imageURL);

        // Grab the SVG text.
        const svgCode = await response.text();

        // Write the file locally.
        fs.writeFileSync(`./_site/img/${filename}`, svgCode);

        // Return the local image path.
        return `/img/${filename}`;
      }

      // Return image URL.
      return imageURL;
    },
  );
}
