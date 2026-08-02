import { FaUser } from "react-icons/fa";

export default {
  name: "guest",
  title: "Guest",
  type: "object",
  icon: FaUser,
  fields: [
    {
      name: "fname",
      title: "First Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
       name: "lname",
       title: "Last Name",
       type: "string",
     },
    {
      name: "bridalShower",
      title: "Bridal Shower Invite",
      type: "boolean",
      initialValue: false,
    },
  ],
  preview: {
    select: {
      fname: "fname",
    },
    prepare({fname}) {
      return {
        title: `Guest: ${fname}`,
      };
    },
  },
};