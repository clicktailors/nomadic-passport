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
import { createCMSProvider } from "../../../lib/cms/cms-factory";
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
	categories: {
		edges: Array<{
			node: {
				name: string;
			};
		}>;
	};
	content: string;
	tags: {
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
								{post.tags.edges.length > 0 && (
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

export const getStaticProps: GetStaticProps<Props> = async ({
	params,
	preview = false,
	previewData,
}) => {
	const cms = createCMSProvider(cmsConfig.type);
	const data = await cms.getPostAndMorePosts(
		params?.slug as string,
		preview,
		previewData
	);

	return {
		props: {
			preview,
			post: data.post,
			posts: data.posts,
		},
		revalidate: 10,
	};
};

export const getStaticPaths: GetStaticPaths = async () => {
	const cms = createCMSProvider(cmsConfig.type);
	const allPosts = await cms.getAllPostsWithSlug();

	return {
		paths:
			allPosts.edges.map(
				({ node }: { node: { slug: string } }) =>
					`/blog/posts/${node.slug}`
			) || [],
		fallback: true,
	};
};
