import React from "react";
import Head from "next/head";
import Link from "next/link";
import Layout from "../../pages/layout";
import Container from "../../components/ui/Container";
import { SITE_NAME } from "../../lib/constants";

const ApplicationChoice = () => {
	const pageTitle = "Choose Application Type";

	return (
		<Layout>
			<Head>
				<title>{`${pageTitle} | ${SITE_NAME}`}</title>
			</Head>
			<Container>
				<h1 className="text-4xl font-bold mb-8 text-center">
					{pageTitle}
				</h1>
				<div className="flex flex-col md:flex-row justify-center items-center gap-8">
					<Link
						href="/applications/buyer"
						className="btn btn-primary"
					>
						Buyer Application
					</Link>
					<Link
						href="/applications/seller"
						className="btn btn-secondary"
					>
						Seller Application
					</Link>
				</div>
			</Container>
		</Layout>
	);
};

export default ApplicationChoice;
