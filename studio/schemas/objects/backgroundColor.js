import { BiColorFill } from "react-icons/bi";

export default {
  name: "backgroundColor",
  icon: BiColorFill,
  title: "Background Color",
  type: "object",
  fields: [
    {
      name: "backgroundColor",
      title: "Background color",
      type: "simplerColor",
      options: {
        colorList: [
          { label: "Black", value: "bg-black" },
          { label: "Gold", value: "bg-gold" },
          { label: "Green", value: "bg-crete" },
          { label: "Light Green", value: "bg-pine-glade" },
          { label: "Maroon", value: "bg-tawny-port" },
          { label: "Periwinkle", value: "bg-periwinkle" },
          { label: "Pink", value: "bg-twilight" },
          { label: "Purple", value: "bg-grape" },
          { label: "White", value: "bg-white" },
        ],
      },
    },
  ],
};
