export default class Index {
  data() {
    return {
      layout: "homepage",
      eleventyComputed: {
        title: (data) => data.homepage.title,
        heroImage: (data) => data.homepage.heroImage,
        seo: (data) => data.homepage.seo,
        seoImage: (data) => data.homepage.seo?.seoImage,
      },
    };
  }

  render() {
    return "";
  }
}
