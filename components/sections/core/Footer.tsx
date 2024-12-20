"use client";

import React, { useEffect, useState } from "react";
import { CTA_LINK, CTA_TEXT } from "../../../lib/constants";
import Link from "next/link";
import NavigationItems from "../../navbar/NavigationItems";
import { usePathname } from "next/navigation";
import Socials from "../../ui/Socials";
import Copyright from "../misc/Copyright";
import SiteTitle from "../../ui/SiteTitle";
import { useTheme } from "next-themes";

const Links: React.FC<{ inverted: boolean }> = ({ inverted }) => {
	const [mounted, setMounted] = useState(false);
	const currentPath = usePathname();
	// is theme dark?
	const { theme } = useTheme();

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		return null;
	}

	return (
		<nav className="flex flex-col md:grid md:grid-flow-col md:gap-4 items-center w-full">
			<div className="flex flex-col gap-4 md:gap-4 items-center w-full">
				<NavigationItems
					currentPath={currentPath ?? ""}
					footer={true}
					inverted
				/>
				<Link 
					href={CTA_LINK} 
					className="link link-hover py-2 px-4 text-lg md:text-base"
				>
					{CTA_TEXT}
				</Link>
			</div>
		</nav>
	);
};

const Footer: React.FC = () => {
	const { theme } = useTheme();
	return (
		<footer className="border-accent-2 footer footer-center py-16 px-4 md:px-8 lg:px-16 bg-darkBg">
			<div className="container mx-auto max-w-5xl flex flex-col gap-12 md:gap-8">
				<div className="flex flex-col gap-8 md:gap-6">
					<SiteTitle size="text-4xl" logoSize="size-8" inverted />
					<Links inverted />
				</div>
				<div className="flex flex-col gap-8 md:gap-6">
					<Socials inverted />
					<div className="flex flex-col items-center gap-4 text-lightText">
						<Copyright />
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
