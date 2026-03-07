import richText from "./richText";
import { GiAccordion } from "react-icons/gi";

export default {
  name: "accordion",
  title: "Accordion",
  icon: GiAccordion,
  type: "object",
  fields: [
    {
      name: "heading",
      title: "Heading",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      ...richText,
      validation: (Rule) => Rule.required(),
    },
  ],
};
