import { FaGifts } from "react-icons/fa";

export default {
  name: "registry",
  title: "Registry",
  type: "object",
  icon: FaGifts,
  fields: [
    {
      name: "registry",
      title: "Registry URL",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      registry: "registry",
    },
    prepare({registry}) {
      return {
        title: `Registry: ${registry}`,
      };
    },
  },
};