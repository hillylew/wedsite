import sectionsQuery from "../utils/sectionsQuery.js";
import fetchSanityData from "../utils/fetchSanityData.js";

export default async function (configData) {
  const query = `
    *[_type == "page"]{
      _id,
      _updatedAt,
      title, 
      slug, 
      heroHeading,
      heroImage,
      "bgColor": backgroundColor.backgroundColor.value,
      ${sectionsQuery}
      seo,
    }
  `;

  return fetchSanityData("pages", "15m", query, configData.preview);
}
