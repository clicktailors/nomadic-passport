"use client";

import { useEffect, useRef } from "react";
import { useGoogleAnalytics } from "./useGoogleAnalytics";

export function useBlogTracking(title?: string, slug?: string) {
	const { trackBlogView, trackBlogReadTime } = useGoogleAnalytics();
	const startTime = useRef(Date.now());
	const hasTrackedView = useRef(false);

	useEffect(() => {
		if (!title || !slug) return;

		// Track the blog view once
		if (!hasTrackedView.current) {
			trackBlogView(title, slug);
			hasTrackedView.current = true;
		}

		// Track time spent on unmount
		return () => {
			const timeSpent = Math.floor((Date.now() - startTime.current) / 1000);
			trackBlogReadTime(title, slug, timeSpent);
		};
	}, [title, slug, trackBlogView, trackBlogReadTime]);
} 