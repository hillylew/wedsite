import { ImTable2 } from "react-icons/im";

export default {
  name: "tableSection",
  icon: ImTable2,
  title: "Table",
  type: "object",
  fields: [
    {
      name: "style",
      title: "Style",
      type: "string",
      description:
        "Select the style of the tables. Rows will show row seperation with alternating background colors, while borders will show row seperation with colored lines.",
      options: {
        list: ["rows", "borders"],
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "data",
      title: "Data",
      type: "table",
      validation: (Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      style: "style",
    },
    prepare({ style }) {
      return {
        title: "Table",
        subtitle: `${style} style`,
      };
    },
  },
};
