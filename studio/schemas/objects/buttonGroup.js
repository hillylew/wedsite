import backgroundColor from "./backgroundColor";
import { BiJoystickButton } from "react-icons/bi";

export default {
  name: "buttonGroup",
  icon: BiJoystickButton,
  title: "Button Group",
  type: "object",
  fields: [
    {
      name: "buttons",
      title: "Buttons",
      type: "array",
      of: [{ type: "link" }],
    },
    {
      ...backgroundColor,
      validation: (Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      buttons: "buttons",
    },
    prepare({ buttons }) {
      return {
        title: `Button Group`,
        subtitle: `${buttons.length} button(s)`,
      };
    },
  },
};
