import React from "react";
import Layout from "../layout";
import Container from "../../components/ui/Container";
import Intro from "../../components/sections/core/Intro";
import { SITE_NAME } from "../../lib/constants";
import Head from "next/head";

const About = () => {
	const pageTitle = "About";

	return (
		<Layout>
			<Head>
				<title>{`${SITE_NAME} | ${pageTitle}`}</title>
			</Head>
			<Container>
				<Intro pageTitle={`${pageTitle} Us`} />
				CTA Section
			</Container>
		</Layout>
	);
};

export default About;
