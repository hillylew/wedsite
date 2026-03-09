import { BiImageAdd } from "react-icons/bi";

export default {
  name: "backgroundImage",
  icon: BiImageAdd,
  title: "Background Image",
  type: "object",
  fields: [
    {
      name: "backgroundImage",
      title: "Background image",
      type: "image",
      options: {
        hotspot: true,
      },
    },
  ],
};
