import { GetStaticProps } from "next";
import Head from "next/head";
import MoreStories from "../../components/blog/MoreStories";
import HeroPost from "../../components/blog/HeroPost";
import Intro from "../../components/sections/core/Intro";
import Layout from "../layout";
import { SITE_NAME } from "../../lib/constants";
import Newsletter from "../../components/sections/marketing/Newsletter";
import { useRouter } from "next/router";
import { createCMSProvider, CMSType } from "../../lib/cms/cms-factory";

interface Props {
	allPosts: any[];
	currentPage: number;
}

export default function Index({ allPosts, currentPage }: Props) {
	const router = useRouter();
	const heroPost = allPosts[0];
	const morePosts = allPosts.slice(1);
	const pageTitle = "Featured Posts";

	const heroPostProps = heroPost && {
		title: heroPost.title,
		coverImage: { node: { sourceUrl: heroPost.featured_image || "" } },
		date: heroPost.date,
		author: { node: { name: heroPost.author || "Anonymous" } },
		slug: heroPost.slug,
		excerpt: heroPost.excerpt,
	};

	const paginationProps = {
		hasNextPage: allPosts.length > 10,
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
						disabled={!paginationProps.hasNextPage}
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
			<Intro pageTitle={pageTitle} />
			{heroPost && <HeroPost {...heroPostProps} />}
			{morePosts.length > 0 && (
				<MoreStories
					posts={morePosts.map(post => ({
						node: {
							title: post.title,
							featuredImage: { node: { sourceUrl: post.featured_image || "" } },
							date: post.date,
							author: { node: { name: post.author || "Anonymous" } },
							slug: post.slug,
							excerpt: post.excerpt,
						}
					}))}
				/>
			)}
			<Pagination />
			<Newsletter />
		</Layout>
	);
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
	try {
		const cms = createCMSProvider(process.env.CMS_TYPE as CMSType);
		const currentPage = params?.page ? parseInt(params.page as string) : 1;
		const allPosts = await cms.getAllPostsForHome(false);

		const postsPerPage = 10;
		const start = (currentPage - 1) * postsPerPage;
		const paginatedPosts = allPosts.slice(start, start + postsPerPage);

		return {
			props: {
				allPosts: paginatedPosts,
				currentPage,
			},
			revalidate: 60,
		};
	} catch (error) {
		console.error('Error fetching blog posts:', error);
		return {
			props: {
				allPosts: [],
				currentPage: 1,
			},
		};
	}
};
