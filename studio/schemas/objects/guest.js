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
      validation: (Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      fname: "fname",
      lname: "lname",
    },
    prepare({fname, lname}) {
      return {
        title: `Guest: ${fname} ${lname}`,
      };
    },
  },
};