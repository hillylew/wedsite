import fetchSanityData from "../utils/fetchSanityData.js";

export default async function () {
  const query = `*[_type == "contactInfo"][0]`;
  return await fetchSanityData("contactInfo", "15m", query);
}
