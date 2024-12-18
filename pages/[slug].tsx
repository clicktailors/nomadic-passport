import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Layout from "./layout";
import { SITE_NAME } from "../lib/constants";
import Container from "../components/ui/Container";
import Section from "../components/ui/Section";
import { createCMSProvider } from "../lib/cms/cms-factory";
import { cmsConfig } from "../lib/config";

interface PageProps {
	page: {
		title: string;
		content: string;
		modified: string;
	};
}

export default function Page({ page }: PageProps) {
	return (
		<Layout>
			<Head>
				<title>{`${page.title} | ${SITE_NAME}`}</title>
			</Head>
			<Section>
				<Container className="py-12">
					<h1 className="text-4xl font-bold mb-8">{page.title}</h1>
					<div
						className="prose max-w-none"
						dangerouslySetInnerHTML={{ __html: page.content }}
					/>
				</Container>
			</Section>
		</Layout>
	);
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
	try {
		const cms = createCMSProvider(cmsConfig.type);
		const page = await cms.getPageBySlug(params?.slug as string);

		if (!page) {
			return {
				notFound: true,
			};
		}

		return {
			props: {
				page,
			},
			revalidate: 60,
		};
	} catch (error) {
		console.error(`Error fetching page ${params?.slug}:`, error);
		return {
			notFound: true,
		};
	}
};

export const getStaticPaths: GetStaticPaths = async () => {
	const cms = createCMSProvider(cmsConfig.type);
	const allPages = await cms.getAllPages();
	const excludedSlugs = ["home"];

	const paths =
		allPages.edges
			.map(({ node }: any) => node.slug)
			.filter(
				(slug: string) => !excludedSlugs.includes(slug.toLowerCase())
			)
			.map((slug: string) => `/${slug}`) || [];

	return {
		paths,
		fallback: "blocking",
	};
};
