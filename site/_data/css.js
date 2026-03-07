import "dotenv/config";
import fs from "node:fs";
import crypto from "node:crypto";
import postcss from "postcss";
import cssnano from "cssnano";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";

export default async function (configData) {
  // Check if we're in preview mode.
  if (configData?.preview) {
    // Fetch the manifest file.
    const manifestResponse = await fetch(
      `${process.env.SITE_URL}/css-manifest.json`,
    );

    // Grab the JSON from the response.
    const manifestJSON = await manifestResponse.json();

    // Return the URL in the manifest.
    return `${process.env.SITE_URL}/${manifestJSON.file}`;
  }

  // Grab css file content.
  const cssFile = fs.readFileSync("./style.css", "utf8");

  // Run css through postcss
  const result = await postcss([tailwindcss, autoprefixer, cssnano]).process(
    cssFile,
    { from: undefined },
  );

  // Create a hash and the css file contents.
  const hash = crypto
    .createHash("sha256")
    .update(result.css)
    .digest("hex")
    .slice(0, 20);

  // Determine filename.
  const filename = `style.${hash}.css`;

  // Write the manifest file.
  fs.writeFileSync(
    "./_site/css-manifest.json",
    JSON.stringify({ file: filename }),
  );

  // Write the CSS file.
  fs.writeFileSync(`./_site/${filename}`, result.css);

  // Return the hashed filename.
  return `/${filename}`;
}
