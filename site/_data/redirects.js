import fetchSanityData from "../utils/fetchSanityData.js";

export default async function () {
  const query = `
    *[_type == "redirect"] {
      to,
      from,
      type,
    }
  `;

  return await fetchSanityData("redirects", "15m", query);
}
