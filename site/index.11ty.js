export default class Index {
  data() {
    return {
      layout: "homepage",
      eleventyComputed: {
        title: (data) => data.homepage.title,
        seo: (data) => data.homepage.seo,
      },
    };
  }

  render() {
    return "";
  }
}
