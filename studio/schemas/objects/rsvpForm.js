import backgroundColor from "./backgroundColor";
import richImage from "./richImage";
import { BsEnvelopePaperHeart } from "react-icons/bs";

export default {
  name: "rsvpForm",
  title: "RSVP Form",
  type: "object",
  icon: BsEnvelopePaperHeart,
  fields: [
    {
      ...backgroundColor,
      validation: (Rule) => Rule.required(),
    },
    {
      ...richImage
    },
  ],
  preview: {
    prepare() {
      return {
        title: `RSVP Form`,
      };
    },
  },
};
