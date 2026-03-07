import { AiOutlineLink } from "react-icons/ai";

export default {
  name: "navigation.section",
  type: "object",
  title: "Section",
  icon: AiOutlineLink,

  fields: [
    {
      type: "string",
      name: "title",
      title: "Title",
    },
    {
      name: "page",
      title: "Page",
      type: "reference",
      to: [{ type: "page" }],
    },

    {
      name: "customURL",
      title: "Custom URL",
      type: "url",
      validation: (Rule) => Rule.uri({ allowRelative: true }),
      description:
        "If this link is not a page, you can enter a custom URL here.",
    },

    {
      type: "array",
      name: "links",
      title: "Links",
      of: [{ type: "navigation.link" }],
    },
  ],

  preview: {
    select: {
      title: "title",
      links: "links",
    },

    prepare({ title, links }) {
      return {
        title: `${title}`,
        subtitle: `${links?.length || 0} ${
          links?.length === 1 ? "child" : "children"
        }`,
      };
    },
  },
};

