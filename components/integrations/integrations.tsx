"use client";

import ThirdPartyScripts from "./ThirdPartyScripts";
import FacebookPixel from "./facebook/FacebookPixel";
import GoogleAnalytics from "./google/GoogleAnalytics";

export default function Integrations() {
	return (
		<>
			<GoogleAnalytics />
			<ThirdPartyScripts />
			<FacebookPixel />
		</>
	);
}
