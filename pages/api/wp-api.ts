import axios from 'axios';

export async function fetchAPI(
	query = "",
	{ variables }: Record<string, any> = {},
	apiUrl: string,
	authToken?: string
) {
	const headers: Record<string, string> = { 
		"Content-Type": "application/json",
		"Accept": "application/json"
	};

	if (authToken) {
		headers["Authorization"] = `Bearer ${authToken}`;
	}

	const maxRetries = 5;
	let lastError;

	for (let attempt = 0; attempt < maxRetries; attempt++) {
		try {
			const { data } = await axios.post(apiUrl, {
				query,
				variables,
			}, { 
				headers,
				timeout: 30000,
				maxContentLength: Infinity,
				maxBodyLength: Infinity
			});

			if (data.errors) {
				console.error('GraphQL Errors:', JSON.stringify(data.errors, null, 2));
				throw new Error(data.errors[0]?.message || "Failed to fetch API");
			}
			
			return data.data;
		} catch (error: any) {
			lastError = error;
			console.error(`API Error (attempt ${attempt + 1}/${maxRetries}):`, {
				message: error.message,
				status: error.response?.status,
				query: query.slice(0, 200) + '...',
				variables
			});

			await new Promise(resolve => setTimeout(resolve, 1000 * Math.pow(2, attempt)));
			continue;
		}
	}

	throw new Error(`Failed to fetch API after ${maxRetries} attempts: ${lastError.message}`);
}
