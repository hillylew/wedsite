import fetchSanityData from "../utils/fetchSanityData.js";

export default async function (configData) {
  const query = `
    *[_type == "invite"]{
      _id,
      _updatedAt,
      family, 
      plusone,
      guests[]{
        fname,
        lname,
      },
    }
  `;

  return fetchSanityData("invites", "15m", query, configData.preview);
}
