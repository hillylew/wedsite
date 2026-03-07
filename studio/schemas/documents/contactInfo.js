export default {
  name: "contactInfo",
  title: "Contact Info",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
    },
    {
      name: "address",
      title: "Address",
      type: "string",
    },
    {
      name: "city",
      title: "City",
      type: "string",
    },
    {
      name: "state",
      title: "State",
      type: "string",
    },
    {
      name: "zip",
      title: "Zip",
      type: "string",
    },
    {
      name: "phone",
      title: "Phone",
      type: "string",
    },
    {
      name: "email",
      title: "Email",
      type: "string",
    },
    {
      name: "socials",
      title: "Socials",
      type: "array",
      of: [
        {
          name: "social",
          title: "Social",
          type: "object",
          fields: [
            {
              name: "name",
              title: "Name",
              type: "string",
            },
            {
              name: "url",
              title: "URL",
              type: "url",
            },
            {
              name: "icon",
              title: "Icon",
              type: "image",
            },
          ],
        },
      ],
    },
  ],
};
