import { HiOutlineLink } from "react-icons/hi";

export default {
  name: "link",
  title: "Link",
  icon: HiOutlineLink,
  type: "object",
  fields: [
    {
      name: "label",
      title: "Label",
      type: "string",
      validation: (Rule) => Rule.required(),
      description: "Provide the text for the link.",
    },

    {
      name: "page",
      title: "Page",
      type: "reference",
      to: [{ type: "page" }],
      description:
        "If this link goes to an internal page, select it here. This field is not editable if there is a URL set.",
      readOnly: ({ parent }) => parent?.url !== undefined,
    },

    {
      name: "url",
      title: "URL",
      type: "url",
      validation: (Rule) => Rule.uri({ allowRelative: true }),
      description:
        "If this link is not a page, you can enter a custom URL here. This field is not editable if there is a page set.",
      readOnly: ({ parent }) => parent?.page !== undefined,
    },
  ],

  preview: {
    select: {
      title: "label",
      page: "page.title",
      url: "url",
    },
    prepare({ title, page, url }) {
      return {
        title: `${title}`,
        subtitle: url || page,
      };
    },
  },
};
