import seo from "../objects/seo";
import { RiPagesLine } from "react-icons/ri";
import { isSlugUnique } from "../../lib/isSlugUnique";
import sections from "../objects/sections";
import groups from "../../lib/pageGroups";

export default {
  name: "page",
  title: "Pages",
  groups,
  icon: RiPagesLine,
  type: "document",

  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
      description: "The title of the page",
      group: "settings",
    },

    {
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "settings",
      options: {
        source: "title",
        isUnique: isSlugUnique,
      },
      validation: (Rule) => Rule.required(),
      description: "The path or slug of the page, e.g., about/who-we-are",
    },

    {
      name: "heroHeading",
      title: "Heading",
      type: "string",
      group: "hero",
      validation: (Rule) => Rule.required(),
    },

    {
      ...sections,
      group: "sections",
    },

    {
      ...seo,
      group: "settings",
    },
  ],
};
