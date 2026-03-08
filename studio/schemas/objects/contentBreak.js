import backgroundColor from "./backgroundColor";
import { FaGripLines } from "react-icons/fa";

export default {
  name: "contentBreak",
  title: "Content Break",
  type: "object",
  icon: FaGripLines,
  fields: [
    {
      name: "style",
      title: "Style",
      type: "string",
      validation: (Rule) => Rule.required(),
      options: {
        list: [{ title: "Line break", value: "lineBreak" }],
      },
    },
    {
      ...backgroundColor,
      validation: (Rule) => Rule.required(),
    },
  ],
  preview: {
    prepare() {
      return {
        title: `Content Break`,
      };
    },
  },
};
