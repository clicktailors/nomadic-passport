import { MetadataRoute } from "next";
import { SITE_URL } from "../lib/constants";
import { createCMSProvider } from "../lib/cms/cms-factory";
import { cmsConfig } from "../lib/config";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	// Fetch all blog posts using CMS factory
	const cms = createCMSProvider(cmsConfig.type);
	const posts = await cms.getAllPostsWithSlug();
	const blogPosts = posts?.edges?.map(({ node }: { node: { slug: string; date: string } }) => ({
		url: `${SITE_URL}/blog/posts/${node.slug}`,
		lastModified: new Date(node.date),
		changeFrequency: "monthly",
		priority: 0.7,
	})) || [];

	// Base routes
	const routes = [
		{
			url: SITE_URL,
			lastModified: new Date(),
			changeFrequency: "yearly",
			priority: 1,
		},
		{
			url: `${SITE_URL}/contact`,
			lastModified: new Date(),
			changeFrequency: "monthly",
			priority: 0.8,
		},
		{
			url: `${SITE_URL}/blog`,
			lastModified: new Date(),
			changeFrequency: "weekly",
			priority: 0.5,
		},
		{
			url: `${SITE_URL}/privacy-policy`,
			lastModified: new Date(),
			changeFrequency: "monthly",
			priority: 0.3,
		},
		{
			url: `${SITE_URL}/terms-of-service`,
			lastModified: new Date(),
			changeFrequency: "monthly",
			priority: 0.3,
		},
	];

	return [...routes, ...blogPosts];
}
