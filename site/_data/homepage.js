import sectionsQuery from "../utils/sectionsQuery.js";
import fetchSanityData from "../utils/fetchSanityData.js";

export default async function (configData) {
  const query = `
    *[_type == "homepage"] {
      ...,
      heroImage,
      "bgColor": backgroundColor.backgroundColor.value,
      ${sectionsQuery}
      "seoImage": seo.seoImage
    }[0]
  `;

  return await fetchSanityData("homepage", "15m", query, configData.preview);
}
