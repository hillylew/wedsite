import fetchSanityData from "../utils/fetchSanityData.js";

export default async function () {
  const query = `
    *[_type == "mainMenu" && _id == "mainMenu"] {
      sections[] {
        title,
        "slug": page->slug.current,
        links[] {
          title,
          "slug": page->slug.current,
          children[] {
            title,
            "slug": page->slug.current,
            children[] {
              title,
              "slug": page->slug.current,
            }
          }
        },
      }
    }[0]
  `;

  return fetchSanityData("mainMenu", "15m", query);
}
