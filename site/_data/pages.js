import sectionsQuery from "../utils/sectionsQuery.js";
import fetchSanityData from "../utils/fetchSanityData.js";

export default async function (configData) {
  const query = `
    *[_type == "page"]{
      _id,
      _updatedAt,
      title, 
      slug, 
      ${sectionsQuery}
      seo,
    }
  `;

  return fetchSanityData("pages", "15m", query, configData.preview);
}
