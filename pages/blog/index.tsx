import Head from "next/head";
import { GetStaticProps } from "next";
import MoreStories from "../../components/blog/MoreStories";
import HeroPost from "../../components/blog/HeroPost";
import Intro from "../../components/sections/core/Intro";
import Layout from "../layout";
import { SITE_NAME } from "../../lib/constants";
import Newsletter from "../../components/sections/marketing/Newsletter";
import { useRouter } from "next/router";
import { createCMSProvider } from "../../lib/cms/cms-factory";
import { cmsConfig } from "../../lib/config";

interface Props {
	allPosts: {
		edges: Array<{
			node: {
				title: string;
				excerpt: string;
				slug: string;
				date: string;
				featuredImage?: {
					node: {
						sourceUrl: string;
					};
				};
				author?: {
					node: {
						name: string;
						firstName?: string;
						lastName?: string;
						avatar?: {
							url: string;
						};
					};
				};
			};
		}>;
		pageInfo: {
			hasNextPage: boolean;
			endCursor: string;
		};
	};
	currentPage: number;
}

export default function Index({ allPosts, currentPage }: Props) {
	const router = useRouter();
	const heroPost = allPosts.edges[0]?.node;
	const morePosts = allPosts.edges.slice(1);
	const pageTitle = "Featured Posts";

	const heroPostProps = {
		title: heroPost.title,
		coverImage: heroPost.featuredImage || { node: { sourceUrl: "" } },
		date: heroPost.date,
		author: heroPost.author,
		slug: heroPost.slug,
		excerpt: heroPost.excerpt,
	};

	const paginationProps = {
		hasNextPage: allPosts.pageInfo.hasNextPage,
		currentPage: currentPage,
	};

	const Pagination = () => {
		return (
			<div className="flex justify-center my-8">
				<div className="join">
					<button
						onClick={() =>
							router.push(`/blog?page=${currentPage - 1}`)
						}
						disabled={currentPage <= 1}
						className="join-item btn btn-outline"
					>
						«
					</button>
					<button
						className="join-item btn btn-outline no-animation"
						disabled
					>
						Page {currentPage}
					</button>
					<button
						onClick={() =>
							router.push(`/blog?page=${currentPage + 1}`)
						}
						disabled={!allPosts.pageInfo.hasNextPage}
						className="join-item btn btn-outline"
					>
						»
					</button>
				</div>
			</div>
		);
	};

	return (
		<Layout>
			<Head>
				<title>{`${pageTitle} | ${SITE_NAME}`}</title>
			</Head>
			{/* Page Title Header */}
			<Intro pageTitle={pageTitle} />
			{/* Hero Post */}
			{heroPost && <HeroPost {...heroPostProps} />}
			{/* More Stories */}
			{morePosts.length > 0 && <MoreStories posts={morePosts} />}
			{/* Pagination */}
			<Pagination />
			{/* Newsletter */}
			<Newsletter />
		</Layout>
	);
}

export const getStaticProps: GetStaticProps = async ({
	preview = false,
	params,
}) => {
	const cms = createCMSProvider(cmsConfig.type);
	const currentPage = params?.page ? parseInt(params.page as string) : 1;
	const allPosts = await cms.getAllPostsForHome(false, currentPage);

	return {
		props: { allPosts, currentPage },
		revalidate: 10,
	};
};
