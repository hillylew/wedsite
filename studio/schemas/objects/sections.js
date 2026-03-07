export default {
  name: "sections",
  title: "Sections",
  type: "array",
  description: "Content sections for the page.",
  options: {
    insertMenu: {
      views: [
        {
          name: "grid",
          previewImageUrl: (schemaTypeName) =>
            `/static/preview-${schemaTypeName}.png`,
        },
      ],
    },
  },
  of: [
    { type: "accordions" },
    { type: "buttonGroup" },
    { type: "contentBreak" },
    { type: "quote" },
    { type: "richImage" },
    { type: "richText" },
    { type: "tableSection" }
  ],
};
