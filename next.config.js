/** @type {import('next').NextConfig} */

// Extract domain from WordPress API URL
const getWordPressDomain = () => {
	try {
		if (process.env.WORDPRESS_API_URL) {
			const url = new URL(process.env.WORDPRESS_API_URL);
			return url.hostname;
		}
		return null;
	} catch (error) {
		console.warn("Invalid WORDPRESS_API_URL format");
		return null;
	}
};

const wpDomain = getWordPressDomain();

const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "*.gravatar.com",
			},
			...(wpDomain
				? [
						{
							protocol: "https",
							hostname: wpDomain,
						},
				  ]
				: []),
			{
				protocol: "https",
				hostname: "*.wp.com",
			},
			{
				protocol: "https",
				hostname: "i0.wp.com",
			},
			{
				protocol: "https",
				hostname: "cdn.sanity.io",
			},
			{
				protocol: "https",
				hostname: "images.unsplash.com",
			},
			{
				protocol: "http",
				hostname: "localhost",
			},
		],
	},
};

module.exports = nextConfig;
