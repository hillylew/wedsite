export default class Pages {
  data() {
    return {
      layout: "page",

      pagination: {
        data: "pages",
        size: 1,
        alias: "item",
      },

      eleventyComputed: {
        title: (data) => data.item.title,
        sections: (data) => data.item.sections,
        seo: (data) => data.item.seo,
      },

      permalink: (data) => `/${data.item.slug.current}/`,
    };
  }

  render() {
    return "";
  }
}
