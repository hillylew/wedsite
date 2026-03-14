import backgroundColor from "../objects/backgroundColor";
import sections from "../objects/sections";
import groups from "../../lib/pageGroups";
import seo from "../objects/seo";

export default {
  name: "homepage",
  title: "Homepage",
  type: "document",
  groups,
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      group: "settings",
      validation: (Rule) => Rule.required(),
    },

    {
      ...seo,
      group: "settings",
    },

    {
      name: "heroHeading",
      title: "Heading",
      type: "string",
      group: "hero",
      validation: (Rule) => Rule.required(),
    },

    {
      name: "heroImage",
      title: "Hero Background Image",
      type: "image",
      options: {
        hotspot: true,
      },
      group: "hero",
      validation: (Rule) => Rule.required(),
    },

    {
      ...backgroundColor,
      title: "Hero Background Color",
      group: "hero",
      validation: (Rule) => Rule.required(),
    },

    {
      ...sections,
      group: "sections",
    },
  ],
};
