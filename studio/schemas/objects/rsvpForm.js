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
    {
      name: "eventType",
      title: "Event Type",
      type: "string",
      options: {
        list: [
          { title: "Wedding", value: "wedding" },
          { title: "Bridal Shower", value: "bridal-shower" },
        ],
      },
      validation: (Rule) => Rule.required(),
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
