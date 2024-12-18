import { NextApiRequest, NextApiResponse } from "next";
import { SITE_URL } from "../../lib/constants";
import { createCMSProvider } from "../../lib/cms/cms-factory";
import { cmsConfig } from "../../lib/config";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	try {
		// Fetch all blog posts using CMS factory
		const cms = createCMSProvider(cmsConfig.type);
		const posts = await cms.getAllPostsWithSlug();
		
		// Base routes
		const routes = [
			{
				url: SITE_URL,
				lastmod: new Date().toISOString(),
				changefreq: "yearly",
				
				priority: 1,
			},
			{
				url: `${SITE_URL}/contact`,
				lastmod: new Date().toISOString(),
				changefreq: "monthly",
				priority: 0.8,
			},
			{
				url: `${SITE_URL}/blog`,
				lastmod: new Date().toISOString(),
				changefreq: "weekly",
				priority: 0.5,
			},
		];

		// Add blog posts to sitemap
		const blogPosts = posts?.edges?.map(({ node }: { node: any }) => ({
			url: `${SITE_URL}/blog/posts/${node.slug}`,
			lastmod: new Date(node.modified || node.date).toISOString(),
			changefreq: "monthly",
			priority: 0.7,
		})) || [];

		// Generate XML
		const xml = `<?xml version="1.0" encoding="UTF-8"?>
		<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
			${[...routes, ...blogPosts]
				.map(
					(route) => `
				<url>
					<loc>${route.url}</loc>
					<lastmod>${route.lastmod}</lastmod>
					<changefreq>${route.changefreq}</changefreq>
					<priority>${route.priority}</priority>
				</url>
			`
				)
				.join("")}
		</urlset>`;

		// Set headers
		res.setHeader("Content-Type", "application/xml");
		res.setHeader("Cache-Control", "public, s-maxage=600, stale-while-revalidate=600");

		// Send response
		return res.status(200).send(xml);
	} catch (error) {
		console.error("Error generating sitemap:", error);
		return res.status(500).json({ error: "Error generating sitemap" });
	}
}