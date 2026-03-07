export default {
  name: "mainMenu",
  title: "Main Menu",
  type: "document",
  fields: [
    {
      type: "array",
      name: "sections",
      title: "Sections",
      of: [{ type: "navigation.section" }],
    },
  ],
  preview: {
    prepare() {
      return {
        title: `Main Menu`,
      };
    },
  },
};
