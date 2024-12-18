"use client";

import { HomeIcon } from "@heroicons/react/24/outline";
import { usePathname } from "next/navigation";

const titleCase = (str: string) => {
	const smallWords = new Set([
		"a",
		"an",
		"and",
		"as",
		"at",
		"but",
		"by",
		"for",
		"if",
		"in",
		"is",
		"of",
		"on",
		"or",
		"the",
		"to",
		"via",
		"with",
	]);

	return str
		.toLowerCase()
		.split(" ")
		.map((word, index, array) => {
			// Always capitalize the first and last word
			if (index === 0 || index === array.length - 1) {
				return word.charAt(0).toUpperCase() + word.slice(1);
			}
			// Check if the word should remain lowercase
			if (smallWords.has(word)) {
				return word;
			}
			// Capitalize the first letter of other words
			return word.charAt(0).toUpperCase() + word.slice(1);
		})
		.join(" ");
};

export default function Breadcrumbs() {
	const path = usePathname() || "";

	if (path === "/") return null;
	const pathSegments = path
		.split("/")
		.filter((segment) => segment !== "" && segment !== "posts");

	return (
		<div className="breadcrumbs text-sm px-4">
			<ul>
				<li>
					<a href="/">
						<HomeIcon className="w-4 h-4" />
					</a>
				</li>
				{pathSegments &&
					pathSegments.map((path, index, array) => (
						<li key={index}>
							<a href={`/${array.slice(0, index + 1).join("/")}`}>
								{titleCase(path.replace(/-/g, " "))}
							</a>
						</li>
					))}
			</ul>
		</div>
	);
}
