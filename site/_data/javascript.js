import "dotenv/config";
import esbuild from "esbuild";
import fs from "node:fs";
import crypto from "node:crypto";

export default async function (configData) {
  // Check if we're in preview mode.
  if (configData?.preview) {
    // Fetch the manifest file.
    const manifestResponse = await fetch(
      `${process.env.SITE_URL}/js-manifest.json`,
    );

    // Grab the JSON from the response.
    const manifestJSON = await manifestResponse.json();

    // Return the URL in the manifest.
    return `${process.env.SITE_URL}/${manifestJSON.file}`;
  }

  const output = await esbuild.build({
    target: "es2020",
    entryPoints: ["app.js"],
    minify: true,
    bundle: true,
    write: false,
  });

  // Create a hash and the css file contents.
  const hash = crypto
    .createHash("sha256")
    .update(output.outputFiles[0].text)
    .digest("hex")
    .slice(0, 20);

  // Determine filename.
  const filename = `app.${hash}.js`;

  // Write the manifest file.
  fs.writeFileSync(
    "./_site/js-manifest.json",
    JSON.stringify({ file: filename }),
  );

  // Write the CSS file.
  fs.writeFileSync(`./_site/${filename}`, output.outputFiles[0].text);

  // Return the hashed filename.
  return `/${filename}`;
}
