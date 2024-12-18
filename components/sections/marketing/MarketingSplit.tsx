import {
	CloudArrowUpIcon,
	LockClosedIcon,
	ServerIcon,
} from "@heroicons/react/20/solid";
import React from "react";
import Link from "next/link";
import * as icons from "@heroicons/react/24/outline";
import { convertToId } from "../../../utils/formatters";
import Section from "../../ui/Section";
import Container from "../../ui/Container";
import Lottie from "../../images/animations/lottie";
import Image from "next/image";

// ~SAMPLE CONTENT
// const sampleContent = {
// 	sectionTitle: "",
// 	sectionHeading: "",
// 	sectionSummary:
// 		"",
// 	imageURL:
// 		"",
// 	features: [
// 		{
// 			name: "",
// 			description:
// 				"",
// 			icon: "MapIcon",
// 		},
// 		{
// 			name: "",
// 			description:
// 				"",
// 			icon: "BuildingLibraryIcon",
// 		},
// 		{
// 			name: "",
// 			description:
// 				"",
// 			icon: "PuzzlePieceIcon",
// 		},
// 		{
// 			name: "",
// 			description:
// 				"",
// 			icon: "UserGroupIcon",
// 		},
// 	],
// };

interface MarketingSplitContent {
	button?: string;
	buttonLink?: string;
	sectionTitle: string;
	sectionHeading: string;
	sectionSummary: string;
	imageURL?: string;
	imagePosition?: "left" | "right";
	features: Array<{
		name: string;
		description: string;
		icon: keyof typeof icons;
	}>;
	lottie?: {
		src: string;
		loop: boolean;
		autoplay: boolean;
		style: {
			width: string;
			height: string;
		};
	};
}

// Export the interface so it can be imported in other files
export type { MarketingSplitContent };

export default function MarketingSplit({
	content = {
		sectionTitle: "",
		sectionHeading: "",
		sectionSummary: "",
		imageURL: "",
		features: [],
		imagePosition: "right",
		lottie: {
			src: "",
			loop: true,
			autoplay: true,
			style: {
				width: "100%",
				height: "100%",
			},
		},
	},
}: {
	content: MarketingSplitContent;
}) {
	const {
		sectionTitle = "",
		sectionHeading = "",
		sectionSummary = "",
		imageURL = "",
		features = [],
		button,
		buttonLink,
		lottie,
	} = content || {};

	if (!sectionTitle) return null; // Don't render if there's no content

	const ImageSection = () => {
		if (!imageURL && !lottie) {
			return <div className="lg:order-last"></div>; // Return an empty div if no image or lottie
		}
		return (
			<div className="lg:order-last">
				{imageURL && (
					<Image
						src={imageURL}
						alt="Product screenshot"
						className="w-full rounded-xl shadow-xl sm:w-[57rem]"
						width={2432}
						height={1442}
					/>
				)}
				{lottie && (
					<div className="w-full rounded-xl ring-1">
						<Lottie
							src={lottie.src}
							loop={lottie.loop}
							autoplay={lottie.autoplay}
						/>
					</div>
				)}
			</div>
		);
	};

	const TextSection = () => {
		return (
			<div className="lg:pr-8">
				{/* Features */}
				<dl className="max-w-xl space-y-8 leading-7 lg:max-w-none">
					{features.map((feature) => (
						<div key={feature.name} className="relative pl-9">
							<dt className="inline font-semibold">
								{React.createElement(icons[feature.icon], {
									className:
										"absolute left-1 top-1 h-5 w-5 text-primary",
									"aria-hidden": "true",
								})}
							</dt>{" "}
							<dd className="inline">{feature.description}</dd>
						</div>
					))}
				</dl>

				{/* Conditionally render the button */}
				{button && buttonLink && (
					<div
						id={convertToId(button)}
						className="mt-10 flex justify-center"
					>
						<button className="btn btn-primary">
							<Link href={buttonLink}>{button}</Link>
						</button>
					</div>
				)}
			</div>
		);
	};

	return (
		<Section>
			<Container>
				<div id={convertToId(sectionTitle)} className="overflow-hidden">
					{/* Centered heading and summary */}
					<div className="mx-auto max-w-2xl lg:text-center">
						<h2
							id={convertToId(sectionTitle)}
							className="font-semibold leading-7 text-primary"
						>
							{sectionTitle}
						</h2>
						<p
							id={convertToId(sectionHeading)}
							className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl"
						>
							{sectionHeading}
						</p>
						<p
							id={convertToId(sectionSummary)}
							className="mt-6 text-lg leading-8 max-w-3xl mx-auto"
						>
							{sectionSummary}
						</p>
					</div>

					{/* Split layout */}
					<div className="my-16 mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
						<ImageSection />
						<TextSection />
					</div>
				</div>
			</Container>
		</Section>
	);
}
