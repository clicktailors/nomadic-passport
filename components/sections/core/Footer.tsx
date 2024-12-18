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
		<nav className="grid grid-flow-col gap-4">
			<NavigationItems
				currentPath={currentPath ?? ""}
				footer={true}
				inverted
			/>
			<Link href={CTA_LINK} className="link link-hover">
				{CTA_TEXT}
			</Link>
		</nav>
	);
};

const Footer: React.FC = () => {
	const { theme } = useTheme();
	return (
		<footer
			className={`border-accent-2 footer footer-center p-16 bg-darkBg`}
		>
			<SiteTitle size="text-4xl" logoSize="size-8" inverted />
			<Links inverted />
			<Socials inverted />
			<div className="flex flex-col items-center text-lightText">
				<Copyright />
			</div>
		</footer>
	);
};

export default Footer;
