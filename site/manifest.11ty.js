export default class Manifest {
  data() {
    return {
      permalink: "manifest.webmanifest",
      eleventyExcludeFromCollections: true,
    };
  }

  render(data) {
    const manifest = {
      short_name: data.siteSettings.siteTitle,
      name: data.siteSettings.siteTitle,
      icons: [
        {
          src: "/homescreen192.png",
          type: "image/png",
          sizes: "192x192",
        },
        {
          src: "/homescreen512.png",
          type: "image/png",
          sizes: "512x512",
        },
      ],
      start_url: "/",
      background_color: "#00274B",
      display: "standalone",
      theme_color: "#00274B",
    };

    return JSON.stringify(manifest);
  }
}
