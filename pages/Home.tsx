import Head from "next/head";
import { GetStaticProps } from "next";
import Layout from "./layout";
import { SITE_NAME } from "../lib/constants";
import * as Marketing from "../components/sections/marketing/_module";
import { MarketingSplitContent } from "../components/sections/marketing/MarketingSplit";
import { BlurbTwoByTwoGridContent } from "../components/sections/marketing/BlurbTwoByTwoGrid";
import BlogCarousel from "../components/blog/BlogCarousel";
import { createCMSProvider } from "../lib/cms/cms-factory";
import { cmsConfig } from "../lib/config";
import { LOGGING } from "../lib/logging";

interface HomeProps {
	preview?: boolean;
	allPosts?: {
		edges: any[];
		pageInfo?: {
			hasNextPage: boolean;
			endCursor: string;
		};
	};
	heroContent?: Record<string, any>;
	gridContent?: BlurbTwoByTwoGridContent;
	splitContent?: MarketingSplitContent;
}

export default function Home({
	preview = false,
	allPosts = { edges: [] },
	heroContent,
	gridContent,
	splitContent,
}: HomeProps) {
	const recentPosts = allPosts?.edges?.slice(0, 6) || [];
	LOGGING && console.log(recentPosts, allPosts);

	return (
		<Layout>
			<Head>
				<title>{`${SITE_NAME}`}</title>
			</Head>
			<main className="overflow-hidden">
				{heroContent && Object.keys(heroContent).length > 0 && (
					<Marketing.Hero content={heroContent} spacing="xl" />
				)}
				{gridContent && Object.keys(gridContent).length > 0 && (
					<Marketing.Splits.BlurbTwoByTwoGrid content={gridContent} spacing="lg" />
				)}
				{splitContent && Object.keys(splitContent).length > 0 && (
					<Marketing.Splits.MarketingSplit content={splitContent} spacing="lg" />
				)}
				{recentPosts.length > 0 && (
					<BlogCarousel posts={recentPosts} spacing="md" />
				)}
				<Marketing.Newsletter spacing="lg" />
			</main>
		</Layout>
	);
}

export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
	try {
		const page = 1;
		const cms = createCMSProvider(cmsConfig.type);
		const allPosts = await cms.getAllPostsForHome(preview, page);
		LOGGING && console.log("getAllPostsForHome response:", allPosts);

		return {
			props: {
				allPosts,
				preview,
				heroContent: {},
				gridContent: {
					blurb: {
						sectionTitle: "",
						sectionHeading: "",
						sectionSummary: "",
					},
					features: [],
				} as BlurbTwoByTwoGridContent,
				splitContent: {
					sectionTitle: "",
					sectionHeading: "",
					sectionSummary: "",
					features: [],
					imagePosition: "right",
				},
			},
			revalidate: 10,
		};
	} catch (error) {
		console.error("Error in getStaticProps:", error);
		return {
			props: {
				allPosts: { edges: [] },
				preview: false,
				heroContent: {},
				gridContent: {
					blurb: {
						sectionTitle: "",
						sectionHeading: "",
						sectionSummary: "",
					},
					features: [],
				} as BlurbTwoByTwoGridContent,
				splitContent: {
					sectionTitle: "",
					sectionHeading: "",
					sectionSummary: "",
					features: [],
					imagePosition: "right",
				},
			},
			revalidate: 10,
		};
	}
};
