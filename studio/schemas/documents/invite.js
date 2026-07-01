import { FaUserFriends } from "react-icons/fa";

export default {
  name: "invite",
  title: "Invite",
  icon: FaUserFriends,
  type: "document",

  fields: [
    {
      name: "family",
      title: "Family Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "plusone",
      title: "Plus One",
      type: "boolean",
      initialValue: false,
    },
    {
      name: "guests",
      title: "Guests",
      type: "array",
      of: [{ type: "guest" }],
      validation: (Rule) => Rule.required(),
    },
  ]
}