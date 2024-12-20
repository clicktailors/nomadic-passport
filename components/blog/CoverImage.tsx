"use client";

import cn from "classnames";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import BlogPlaceholder from "../ui/Images/BlogPlaceholder";

interface Props {
	title: string;
	coverImage: {
		node: {
			sourceUrl: string;
		};
	};
	slug?: string;
}

export default function CoverImage({ title, coverImage, slug }: Props) {
	const [isLoading, setIsLoading] = useState(true);
	const [hasError, setHasError] = useState(false);

	const image = (
		<div className="aspect-video relative w-full">
			{isLoading && (
				<div className="absolute inset-0 bg-base-200 dark:bg-base-300 rounded-xl animate-pulse" />
			)}
			{hasError ? (
				<BlogPlaceholder className="rounded-xl" />
			) : (
				<Image
					width={2000}
					height={1000}
					alt={`Cover Image for ${title}`}
					src={coverImage?.node?.sourceUrl || ""}
					className={cn("rounded-xl object-cover h-full", {
						"hover:shadow-lg transition-shadow duration-200": slug,
						"opacity-0": isLoading,
						"opacity-100 transition-opacity duration-200": !isLoading,
					})}
					priority
					onLoadingComplete={() => setIsLoading(false)}
					onError={() => {
						setHasError(true);
						setIsLoading(false);
					}}
				/>
			)}
		</div>
	);

	return (
		<div className="sm:mx-0">
			{slug ? (
				<Link href={`/blog/posts/${slug}`} aria-label={title}>
					{image}
				</Link>
			) : (
				image
			)}
		</div>
	);
}
