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
      name: "content",
      title: "Content",
      type: "array",
      of: [
        {
          type: "block",
          styles: [
            { title: "Heading 2", value: "h2" },
            { title: "Heading 3", value: "h3" },
            { title: "Heading 4", value: "h4" },
            { title: "Horizontal Rule", value: "hr" }
          ],
        },
      ],
    },
  ],
};
