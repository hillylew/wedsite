import { BsChatLeftQuote } from "react-icons/bs";

export default {
  name: "quote",
  title: "Quote",
  icon: BsChatLeftQuote,
  type: "object",
  fields: [
    {
      name: "quote",
      title: "Quote",
      type: "text",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "attribution",
      title: "Attribution",
      type: "string",
    },
  ],

  preview: {
    select: {
      title: "quote",
      subtitle: "attribution",
    },
    prepare({ title, subtitle }) {
      return {
        title: `${title}`,
        subtitle: `${subtitle || ""}`,
      };
    },
  },
};
