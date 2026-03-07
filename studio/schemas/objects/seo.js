export default {
  name: "seo",
  title: "SEO",
  type: "object",
  fields: [
    {
      name: "metaDescription",
      title: "Meta Description",
      type: "text",
      description:
        "A meta description provides a brief summary of the content of a web page. It is displayed in search engine results pages and serves as a preview of the page's content.",
      validation: (Rule) =>
        Rule.max(160).warning(
          "Meta descriptions should be a maximum of 160 characters for them to be the most effective."
        ),
    },
    {
      name: "noindex",
      title: "Prevent search engine indexing",
      description:
        "Set to prevent search engines from indexing the content of this page",
      type: "boolean",
    },
  ],
};
