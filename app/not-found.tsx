import { createCMSProvider } from "../lib/cms/cms-factory";
import { cmsConfig } from "../lib/config";
import { Metadata } from "next";
import Link from "next/link";
import MoreStories from "../components/blog/MoreStories";
import Container from "../components/ui/Container";
import Section from "../components/ui/Section";

export const metadata: Metadata = {
	title: `Page Not Found | ${cmsConfig.siteName}`,
};

export default async function NotFound() {
	const cms = createCMSProvider(cmsConfig.type);
	const posts = await cms.getAllPostsForHome(false, 1, 4);
	const morePosts = posts?.edges?.slice(0, 4) || [];

	return (
		<>
			<Section>
				<Container>
					<div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
						<h1 className="text-9xl font-bold text-gray-200">
							404
						</h1>
						<h2 className="mt-4 text-4xl font-bold">
							Page Not Found
						</h2>
						<p className="mt-4 text-xl text-gray-600 max-w-lg">
							Sorry, we couldn't find the page you're looking for.
							Perhaps you'd like to check out some of our recent
							blog posts instead?
						</p>
						<Link
							href="/"
							className="mt-8 px-8 py-3 bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
						>
							Return Home
						</Link>
					</div>
				</Container>
			</Section>

			{morePosts.length > 0 && (
				<Section>
					<Container>
						<h3 className="text-3xl font-bold mb-12 text-center">
							Recent Blog Posts
						</h3>
						<MoreStories posts={morePosts} />
					</Container>
				</Section>
			)}
		</>
	);
}
