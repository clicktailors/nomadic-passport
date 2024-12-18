"use client";

import Head from "next/head";
import Script from "next/script";
import { CMS_NAME, SITE_DESCRIPTION } from "../../../lib/constants";
import { usePathname } from "next/navigation";

export default function Meta() {
	const pathname = usePathname();
	const canonicalUrl = `https://clicktailors.com${pathname}`;

	return (
		<Head>
			<link
				rel="apple-touch-icon"
				sizes="180x180"
				href="/favicon/apple-touch-icon.png"
			/>
			<link
				rel="icon"
				type="image/png"
				sizes="32x32"
				href="/favicon/favicon-32x32.png"
			/>
			<link
				rel="icon"
				type="image/png"
				sizes="16x16"
				href="/favicon/favicon-16x16.png"
			/>
			<link rel="manifest" href="/favicon/site.webmanifest" />
			<link
				rel="mask-icon"
				href="/favicon/safari-pinned-tab.svg"
				color="#000000"
			/>
			<link rel="shortcut icon" href="/favicon/favicon.ico" />
			<meta name="msapplication-TileColor" content="#000000" />
			<meta
				name="msapplication-config"
				content="/favicon/browserconfig.xml"
			/>
			<meta name="theme-color" content="#000" />
			<link rel="alternate" type="application/rss+xml" href="/feed.xml" />
			<meta name="description" content={SITE_DESCRIPTION} />
			<link rel="canonical" href={canonicalUrl} />
		</Head>
	);
}
