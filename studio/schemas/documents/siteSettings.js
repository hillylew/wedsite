export default {
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    {
      name: "siteTitle",
      title: "Site Title",
      type: "string",
      validation: (Rule) => Rule.required(),
      description: "The main title of the website, displays in the browser tab",
    },

    {
      name: "signature",
      title: "Site Signature",
      type: "image",
      validation: Rule => Rule.required(),
    },

    {
      name: "googleID",
      title: "Google ID",
      type: "string",
      description: "Google Analytics / Tag Manager ID",
    },
  ],
};
