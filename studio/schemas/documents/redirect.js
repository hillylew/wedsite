import { HiArrowUturnLeft } from "react-icons/hi2";

export default {
  name: "redirect",
  title: "Redirect",
  type: "document",
  __experimental_formPreviewTitle: false,
  icon: HiArrowUturnLeft,
  fields: [
    {
      name: "from",
      title: "From",
      type: "string",
      description: "The path to redirect from.",
      validation: (Rule) => Rule.required(),
    },

    {
      name: "to",
      title: "To",
      type: "string",
      description: "The path / URL to redirect to.",
      validation: (Rule) => Rule.required(),
    },

    {
      name: "type",
      title: "Type",
      type: "string",
      validation: (Rule) => Rule.required(),
      description:
        "Select the type of redirect. Search engines will update their index to the new page if you choose a permanent redirect.",
      options: {
        layout: "radio",
        list: [
          { title: "Permanent (301)", value: "301" },
          { title: "Temporary (302)", value: "302" },
        ],
      },
    },
  ],

  preview: {
    select: {
      from: "from",
      to: "to",
      type: "type",
    },
    prepare({ from, to, type }) {
      const typeLabel = type == 301 ? "Permanent" : "Temporary";

      return {
        title: `Redirect from ${from} to ${to}`,
        subtitle: `${typeLabel} (${type}) redirect`,
      };
    },
  },
};
