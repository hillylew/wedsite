import fetchSanityData from "../utils/fetchSanityData.js";

export default async function () {
  const query = `
    *[_type == "siteSettings"][0]
  `;

  return fetchSanityData("siteSettings", "15m", query);
}
