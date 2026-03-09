import backgroundColor from "./backgroundColor";
import richImage from "./richImage";
import { BsBodyText } from "react-icons/bs";

export default {
  name: "richText",
  title: "Text",
  icon: BsBodyText,
  type: "object",
  fields: [
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
            { title: "Heading 4", value: "h4" }
          ],
        },
      ],
    },
    {
      ...backgroundColor,
      validation: (Rule) => Rule.required(),
    },
    {
      ...richImage
    },
  ],
};
