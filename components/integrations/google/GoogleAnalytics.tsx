"use client";

import { GoogleAnalytics as NextGoogleAnalytics } from "@next/third-parties/google";
import { useGoogleAnalytics } from "./useGoogleAnalytics";
import { LOGGING } from "../../../lib/logging";

export default function GoogleAnalytics() {
	const gaId = process.env.NEXT_PUBLIC_GA_ID;
	useGoogleAnalytics();

	if (!gaId) {
		LOGGING &&
			console.error(
				"Google Analytics ID is not defined in environment variables"
			);
		return null;
	}

	LOGGING && console.log("Google Analytics mounted with GA ID:", gaId);

	return <NextGoogleAnalytics gaId={gaId} />;
}
