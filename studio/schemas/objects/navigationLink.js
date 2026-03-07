import { AiOutlineLink } from "react-icons/ai";

export default {
  name: "navigation.link",
  type: "object",
  title: "Link",
  icon: AiOutlineLink,

  preview: {
    select: {
      title: "title",
      links: "children",
    },

    prepare: ({ title, links }) => ({
      title: title,
      subtitle: `${links?.length || 0} ${
        links?.length === 1 ? "child" : "children"
      }`,
    }),
  },

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
      type: "array",
      name: "children",
      title: "Children",
      of: [{ type: "navigation.link" }],
    },
  ],
};
