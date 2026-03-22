import { Router } from 'itty-router';
import jwt from '@tsndr/cloudflare-worker-jwt';

const router = Router();

async function getJWTAccessToken(env) {
	const iat = Math.floor(Date.now() / 1000);
	const exp = iat + 3600;
	const jwtToken = jwt.sign(
		{
			iss: env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
			scope: 'https://www.googleapis.com/auth/spreadsheets',
			aud: 'https://accounts.google.com/o/oauth2/token',
			exp,
			iat,
		},
		JSON.parse(env.GOOGLE_PRIVATE_KEY),
		{ algorithm: 'RS256' }
	);
	return jwtToken;
}

async function getGoogleSheetsAccessToken(env) {
	const jwtToken = await getJWTAccessToken(env);
	const response = await fetch('https://accounts.google.com/o/oauth2/token', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
		},
		body: new URLSearchParams({
			grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
			assertion: jwtToken,
		}),
	}).then(response => response.json());
	return response.access_token;
}

async function addRow(payload, accessToken, env) {
	try {
		const response = await fetch(
			`https://sheets.googleapis.com/v4/spreadsheets/${env.GOOGLE_SHEETS_SUBSCRIBERS_ID}/values/${env.GOOGLE_SHEETS_SUBSCRIBERS_PAGE}:append?valueInputOption=USER_ENTERED`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${accessToken}`,
				},
				body: JSON.stringify({
					range: env.GOOGLE_SHEETS_SUBSCRIBERS_PAGE,
					majorDimension: 'ROWS',
					values: [
						[
							payload.guest1fname,
							payload.guest1lname,
                            payload.guest1dinner,
                            payload.guest1allergies,
                            payload.bringguest,
                            payload.guest2fname,
                            payload.guest2lname,
                            payload.guest2dinner,
                            payload.guest2allergies,
                            payload.songrequest,
],
					],
				}),
			}
		);
		if (response.ok)
			return {
				data: 'Success! Your RSVP has been recorded.',
				status: response.status,
			};
		else
			return {
				error: response.statusText,
				status: response.status,
			};
	} catch (error) {
		return {
			error: error,
		};
	}
}

router.get('/', () => {
	return Response.redirect('https://wedsite-dia.pages.dev', 302);
});

router.post('/post', async (request, env) => {
	const data = await request.json();
	const accessToken = await getGoogleSheetsAccessToken(env);
	let response = await addRow(data, accessToken, env);
	if (response === null || typeof response === 'undefined') {
		return new Response('Error adding row to Google Sheets', { status: 500 });
	}
	response = new Response(response.data, { status: response.status });
	response.headers.set('Access-Control-Allow-Origin', '*');
	response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
	return response;
});

router.all('/', () => new Response('404, not found!', { status: 404 }));

export default {
	async fetch(request, env) {
		const response = await router.handle(request, env);
		return response;
	},
};