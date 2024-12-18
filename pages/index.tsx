import HeroImage from "../public/images/marketing-hero/hero.png";
import { CalendarIcon, InformationCircleIcon } from "@heroicons/react/24/solid";
import { GetStaticProps } from "next";

import Home from "./Home";
import { BlurbTwoByTwoGridContent } from "../components/sections/marketing/BlurbTwoByTwoGrid";
import { MarketingSplitContent } from "../components/sections/marketing/MarketingSplit";
import { createCMSProvider } from "../lib/cms/cms-factory";
import { cmsConfig } from "../lib/config";

const heroContent = {
	header: "Your Ideas.",
	header2: "< Our Code />",
	// subheader:
	// 	"At ClickTailors, we specialize in bringing your business to the next level in a world where being digital matters.",
	subheader:
		"At ClickTailors, we specialize in creating custom tailored websites and tools that bring your business to the next level in a world where being digital matters.",
	button: "Free Consultation",
	buttonLink: "/contact",
	buttonIcon: <CalendarIcon className="size-4" />,
	buttonSecondary: "Learn More",
	buttonSecondaryLink: "/blog",
	buttonSecondaryIcon: <InformationCircleIcon className="size-4" />,
	image: HeroImage,
};

const gridContent: BlurbTwoByTwoGridContent = {
	blurb: {
		sectionTitle: "Our Expertise",
		sectionHeading: "Crafting Digital Excellence",
		sectionSummary:
			"ClickTailors is a premier web design agency dedicated to creating stunning, functional websites that elevate your brand and drive business growth.",
		// "Your vision, our expertise. We transform ideas into powerful digital solutions.",
	},
	features: [
		{
			name: "Discovery and Planning",
			description:
				"We begin by understanding your goals, target audience, and requirements to create a comprehensive project roadmap.",
			icon: "MapIcon" as const,
		},
		{
			name: "Responsive Development",
			description:
				"We build websites that look and function flawlessly across all devices, ensuring an optimal user experience for your visitors.",
			icon: "DevicePhoneMobileIcon",
		},
		{
			name: "SEO Optimization",
			description:
				"Our websites are built with search engine optimization in mind, helping your business rank higher in search results and attract more organic traffic.",
			icon: "MagnifyingGlassIcon",
		},
		{
			name: "Ongoing Support",
			description:
				"We provide continuous support and maintenance to keep your website up-to-date, secure, and performing at its best long after launch.",
			icon: "WrenchScrewdriverIcon",
		},
	],
};

const splitContent: MarketingSplitContent = {
	sectionTitle: "Our Design Process",
	sectionHeading: "How We Create Your Perfect Website",
	sectionSummary:
		"At ClickTailors, we follow a streamlined process to deliver stunning, functional websites that perfectly represent your brand. Here's how we work:",
	imageURL:
		"https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
	// lottie: {
	// 	src: "/images/dot-lottie-files/Animation-1728438809855.lottie",
	// 	loop: true,
	// 	autoplay: true,
	// 	style: {
	// 		width: "100%",
	// 		height: "100%",
	// 	},
	// },
	features: [
		{
			name: "Discovery and Planning",
			description:
				"We start by understanding your business goals, target audience, and design preferences to create a comprehensive project plan.",
			icon: "MapIcon" as const,
		},
		{
			name: "Design Concept",
			description:
				"Our creative team develops unique design concepts that align with your brand identity and user experience requirements.",
			icon: "PaintBrushIcon" as const,
		},
		{
			name: "Development and Integration",
			description:
				"We bring your design to life with clean, efficient code and seamlessly integrate necessary features and functionalities.",
			icon: "CodeBracketIcon" as const,
		},
		{
			name: "Testing and Launch",
			description:
				"We rigorously test your website across devices and browsers before launching it to ensure a flawless user experience.",
			icon: "RocketLaunchIcon" as const,
		},
	],
	// button: "Start Your Project",
	// buttonLink: "/contact",
};

export default function Index({
	allPosts,
	preview = false,
}: {
	allPosts: any;
	preview: boolean;
}) {
	return (
		<Home
			heroContent={heroContent || {}}
			gridContent={gridContent || {}}
			splitContent={splitContent || {}}
			allPosts={allPosts || { edges: [] }}
			preview={preview || false}
		/>
	);
}

export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
	try {
		const page = 1;
		const cms = createCMSProvider(cmsConfig.type);
		const allPosts = await cms.getAllPostsForHome(preview, page);

		return {
			props: {
				allPosts,
				preview,
			},
			revalidate: 10,
		};
	} catch (error) {
		console.error("Error in getStaticProps:", error);
		return {
			props: {
				allPosts: { edges: [] },
				preview: false,
			},
			revalidate: 10,
		};
	}
};
