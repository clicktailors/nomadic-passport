"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { LOGGING } from "../../../lib/logging";

declare global {
	interface Window {
		gtag: (
			command: string,
			action: string,
			params: Record<string, any>
		) => void;
	}
}

export function useGoogleAnalytics() {
	const isFirstRender = useRef(true);

	useEffect(() => {
		if (isFirstRender.current) {
			LOGGING && console.log("GA First Render", {
				gaId: process.env.NEXT_PUBLIC_GA_ID,
				hasGtag: typeof window.gtag !== "undefined",
			});
			isFirstRender.current = false;
		}
	}, []);

	const trackEvent = (eventName: string, params = {}) => {
		if (typeof window.gtag !== "undefined") {
			window.gtag("event", eventName, {
				...params,
				send_to: process.env.NEXT_PUBLIC_GA_ID,
			});
		}
	};

	const trackBlogView = (title: string, slug: string) => {
		trackEvent("blog_view", {
			blog_title: title,
			blog_slug: slug,
		});
	};

	const trackBlogReadTime = (title: string, slug: string, timeInSeconds: number) => {
		trackEvent("blog_read_time", {
			blog_title: title,
			blog_slug: slug,
			time_spent: timeInSeconds,
			exceeded_30_seconds: timeInSeconds > 30,
		});
	};

	return { trackEvent, trackBlogView, trackBlogReadTime };
} 