import { GiAccordion } from "react-icons/gi";

export default {
  name: "accordions",
  title: "Accordions",
  type: "object",
  icon: GiAccordion,
  fields: [
    {
      name: "accordions",
      title: "Accordions",
      type: "array",
      validation: (Rule) => Rule.required(),
      of: [{ type: "accordion" }],
    },
  ],

  preview: {
    select: {
      accordions: "accordions",
    },
    prepare({ accordions }) {
      let subtitle = "";

      if (accordions?.length) {
        subtitle = `${accordions?.length} accordion${
          accordions.length > 1 ? "s" : ""
        }`;
      }

      return {
        title: `Accordions`,
        subtitle,
      };
    },
  },
};
