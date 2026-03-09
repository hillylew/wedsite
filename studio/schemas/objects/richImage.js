import { BsCardImage } from "react-icons/bs";

export default {
  name: "richImage",
  title: "Image",
  type: "object",
  icon: BsCardImage,

  fields: [
    {
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alignment",
          title: "Alignment",
          type: "string",
          validation: (Rule) => Rule.required(),
          options: {
            list: [
              { title: "None", value: "none" },
              { title: "Left", value: "left" },
              { title: "Right", value: "right" },
            ],
          },
        },
      ],
    },
  ],

  preview: {
    select: {
      media: "image",
    },
    prepare({ media }) {
      return {
        title: `Image`,
        subtitle: `Alignment: ${media.alignment}`,
        media,
      };
    },
  },
};
