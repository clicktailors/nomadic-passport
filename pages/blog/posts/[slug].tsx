import { GetStaticProps, GetStaticPaths } from "next";
import { useRouter } from "next/router";
import ErrorPage from "next/error";
import Head from "next/head";
import Container from "../../../components/ui/Container";
import Section from "../../../components/ui/Section";
import PostBody from "../../../components/blog/PostBody";
import MoreStories from "../../../components/blog/MoreStories";
import Header from "../../../components/sections/core/Header";
import PostHeader from "../../../components/blog/PostHeader";
import SectionSeparator from "../../../components/ui/SectionSeparator";
import Layout from "../../layout";
import PostTitle from "../../../components/blog/PostTitle";
import Tags from "../../../components/blog/Tags";
import { SITE_NAME } from "../../../lib/constants";
import { createCMSProvider, CMSType } from "../../../lib/cms/cms-factory";
import { cmsConfig } from "../../../lib/config";

interface PostType {
	slug: string;
	title: string;
	featuredImage?: {
		node: {
			sourceUrl: string;
		};
	};
	date: string;
	author: {
		node: {
			name: string;
			firstName?: string;
			lastName?: string;
			avatar?: {
				url: string;
			};
		};
	};
	categories?: {
		edges: Array<{
			node: {
				name: string;
			};
		}>;
	};
	content: string;
	tags?: {
		edges: Array<{
			node: {
				name: string;
			};
		}>;
	};
}

interface PostsType {
	edges: Array<{
		node: PostType;
	}>;
}

interface Props {
	post: PostType;
	posts: PostsType;
	preview?: boolean;
}

interface NeonPost {
	title: string;
	slug: string;
	featured_image?: string;
	date: string;
	author?: string;
	excerpt?: string;
	content: string;
	tags?: string[];
	categories?: string[];
}

export default function Post({ post, posts, preview = false }: Props) {
	const router = useRouter();

	if (!router.isFallback && !post?.slug) {
		return <ErrorPage statusCode={404} />;
	}

	return (
		<Layout>
			<Container>
				{router.isFallback ? (
					<PostTitle>Loading…</PostTitle>
				) : (
					<>
						<article>
							<Head>
								<title>{`${post.title} | ${SITE_NAME}`}</title>
								<meta
									property="og:image"
									content={post.featuredImage?.node.sourceUrl}
								/>
							</Head>
							<PostHeader
								title={post.title}
								coverImage={
									post.featuredImage || {
										node: { sourceUrl: "" },
									}
								}
								date={post.date}
								author={post.author}
								categories={post.categories}
							/>
							<PostBody content={post.content} />
							<footer>
								{post.tags?.edges && post.tags.edges.length > 0 && (
									<Tags tags={post.tags} />
								)}
							</footer>
						</article>

						<SectionSeparator />
						{posts?.edges?.length > 0 && (
							<MoreStories posts={posts.edges} />
						)}
					</>
				)}
			</Container>
		</Layout>
	);
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
	try {
		const cms = createCMSProvider(process.env.CMS_TYPE as CMSType);
		const { post, morePosts } = await cms.getPostAndMorePosts(
			params?.slug as string,
			false
		);

		if (!post) {
			return {
				notFound: true,
			};
		}

		// Transform the post data to match WordPress structure
		const transformedPost = {
			...post,
			featuredImage: { 
				node: { 
					sourceUrl: post.featured_image || "" 
				} 
			},
			author: { 
				node: { 
					name: post.author || "Anonymous" 
				} 
			},
			tags: { 
				edges: post.tags?.map((tag: string) => ({ 
					node: { name: tag } 
				})) || [] 
			},
			categories: { 
				edges: post.categories?.map((category: string) => ({ 
					node: { name: category } 
				})) || [] 
			}
		};

		// Transform morePosts to match WordPress structure
		const transformedPosts = {
			edges: morePosts.map((p: NeonPost) => ({
				node: {
					title: p.title,
					featuredImage: { node: { sourceUrl: p.featured_image || "" } },
					date: p.date,
					author: { node: { name: p.author || "Anonymous" } },
					slug: p.slug,
					excerpt: p.excerpt,
				}
			}))
		};

		return {
			props: {
				post: transformedPost,
				posts: transformedPosts,
				preview: false
			},
			revalidate: 60,
		};
	} catch (error) {
		console.error(`Error fetching post ${params?.slug}:`, error);
		return {
			notFound: true,
		};
	}
};

export const getStaticPaths: GetStaticPaths = async () => {
	const cms = createCMSProvider(process.env.CMS_TYPE as CMSType);
	const allPosts = await cms.getAllPostsWithSlug();

	return {
		paths: allPosts.map((post: { slug: string }) => `/blog/posts/${post.slug}`),
		fallback: 'blocking',
	};
};
