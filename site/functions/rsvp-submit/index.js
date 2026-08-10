import { env } from "cloudflare:workers";
import jwt from "@tsndr/cloudflare-worker-jwt";

async function getJWTAccessToken(env) {
  const iat = Math.floor(Date.now() / 1000);
  const exp = iat + 3600;
  const privateKey = env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n");
  if (!privateKey) throw new Error("Missing GOOGLE_PRIVATE_KEY");
  if (!privateKey.startsWith("-----BEGIN PRIVATE KEY-----")) {
    throw new Error(
      "Invalid private key format - must be PEM format starting with -----BEGIN PRIVATE KEY-----",
    );
  }
  const jwtToken = jwt.sign(
    {
      iss: env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      scope: "https://www.googleapis.com/auth/spreadsheets",
      aud: "https://accounts.google.com/o/oauth2/token",
      exp,
      iat,
    },
    privateKey,
    { algorithm: "RS256" },
  );
  return jwtToken;
}

async function getGoogleSheetsAccessToken(env) {
  const jwtToken = await getJWTAccessToken(env);

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 20000);

  try {
    const response = await fetch("https://accounts.google.com/o/oauth2/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
        assertion: jwtToken,
      }),
      signal: controller.signal,
    });

    if (!response.ok) {
      const text = await response.text().catch(() => "<no body>");
      throw new Error(
        `Failed to get access token: ${response.status} ${response.statusText} | ${text}`,
      );
    }

    const data = await response.json();
    if (!data?.access_token) {
      throw new Error(
        `Access token not found in response: ${JSON.stringify(data)}`,
      );
    }

    return data.access_token;
  } catch (error) {
    console.error("getGoogleSheetsAccessToken error", error);
    throw error;
  } finally {
    clearTimeout(timeoutId);
  }
}

async function addRow(formData, accessToken, env) {
  const eventType = formData.get('eventType') || 'wedding';
  const sheetPage = eventType === 'bridal-shower' 
    ? env.GOOGLE_SHEETS_BRIDAL_SHOWER_PAGE 
    : env.GOOGLE_SHEETS_SUBSCRIBERS_PAGE;
    
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 20000);
 
  try {
    const notes = formData.get("notes") || "";
    const guests = [];
    let guestIndex = 0;
 
    while (true) {
      const fname = formData.get(`guest_${guestIndex}_fname`);
      if (fname === null) break;
 
      guests.push({
        fname: fname,
        lname: formData.get(`guest_${guestIndex}_lname`) || "",
        attending: formData.get(`guest_${guestIndex}_attending`) === "true",
        dinner: formData.get(`guest_${guestIndex}_dinner`) || "",
        allergies: formData.get(`guest_${guestIndex}_allergies`) || "",
      });
      guestIndex++;
    }
 
    if (guests.length === 0) {
      throw new Error("No guest data found in submission");
    }
 
    const values = guests.map((guest, index) => {
      const row = [
        guest.fname,
        guest.lname,
        guest.attending ? "Yes" : "No",
        guest.dinner,
        guest.allergies,
      ];
      if (index === 0) {
        row.push(notes);
      } else {
        row.push("");
      }
      return row;
    });
 
    const response = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${env.GOOGLE_SPREADSHEET_ID}/values/${encodeURIComponent(sheetPage)}:append?valueInputOption=USER_ENTERED`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          range: sheetPage,
          majorDimension: "ROWS",
          values: values,
        }),
        signal: controller.signal,
      },
    );
 
    if (response.ok) {
      return {
        data: "Success! Your RSVP has been recorded.",
        status: response.status,
      };
    } else {
      const body = await response.text().catch(() => "<empty body>");
      return {
        error: `${response.status} ${response.statusText}: ${body}`,
        status: response.status,
      };
    }
  } catch (error) {
    console.error("addRow error", error);
    return {
      error: error instanceof Error ? error.message : String(error),
      status: 500,
    };
  } finally {
    clearTimeout(timeoutId);
  }
}

export async function onRequestGet(context) {
  return Response.redirect(env.SITE_URL, 302);
}

export async function onRequestPost(context) {
  const { request } = context;
  try {
    const formData = await request.formData();
    const accessToken = await getGoogleSheetsAccessToken(env);
    let result = await addRow(formData, accessToken, env);
    if (result.error) {
      return new Response(`Error: ${result.error}`, { status: 500 });
    }
    // Redirect to homepage with success message
    return Response.redirect(env.SITE_URL + "/?rsvp=success", 302);
  } catch (error) {
    return new Response(`Internal Server Error: ${error.message}`, {
      status: 500,
    });
  }
}
