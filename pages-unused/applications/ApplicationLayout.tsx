import React from "react";
import Head from "next/head";
import Layout from "../../pages/layout";
import Container from "../../components/ui/Container";
import Intro from "../../components/sections/core/Intro";
import { SITE_NAME } from "../../lib/constants";

const ApplicationLayout = ({
	children,
	pageTitle,
	pageDescription,
}: {
	children: React.ReactNode;
	pageTitle: string;
	pageDescription: string;
}) => {
	return (
		<Layout>
			<Head>
				<title>{`${pageTitle} | ${SITE_NAME}`}</title>
			</Head>
			<Container>
				<Intro pageTitle={pageTitle} description={pageDescription} />
				{children}
			</Container>
		</Layout>
	);
};

export default ApplicationLayout;
