"use client";

import Link from "next/link";
import { CTA_LINK, CTA_TEXT } from "../../lib/constants";
import { usePathname } from "next/navigation";
import React from "react";
import NavigationItems from "./NavigationItems";
import ToggleButton from "./ToggleButton";
import NavTitle from "./NavTitle";
import Copyright from "../sections/misc/Copyright";
import Socials from "../ui/Socials";
import { styles } from "../../lib/styles";
import ThemeSwitcher from "../ui/ThemeSwitcher";
import Breadcrumbs from "./BreadCrumbs";
import Container from "../ui/Container";
export default function DrawerNavbar({ pageContent }: { pageContent: any }) {
	const [isMenuOpen, setIsMenuOpen] = React.useState(false);
	const path = usePathname();

	const ToggleInput = () => (
		<input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
	);

	const Drawer = () => (
		<div className="drawer-side">
			<label
				htmlFor="my-drawer-3"
				aria-label="close sidebar"
				className="drawer-overlay"
			></label>
			<div className="menu p-4 w-80 min-h-full bg-base-100 flex flex-col justify-between">
				<div>
					<div className="flex justify-between">
						<NavTitle />
						<div className="sm:hidden">
							<ToggleButton
								variant="close"
								toggleId="my-drawer-3"
							/>
						</div>
					</div>
					<ul className="my-4 p-0 flex flex-col items-start w-full">
						<NavigationItems
							currentPath={path ?? ""}
							closeMenu={() => setIsMenuOpen(false)}
							drawer={true}
						/>
					</ul>
				</div>
				<div className="flex justify-center p-4">
					<div className="flex flex-col gap-4 items-center">
						<Socials />
						<Copyright />
					</div>
				</div>
			</div>
		</div>
	);

	const HorizontalNavItems = () => (
		<div className="flex-none hidden sm:block">
			<ul className="menu menu-horizontal gap-1">
				<NavigationItems currentPath={path ?? ""} />
			</ul>
		</div>
	);

	const HorizontalNav = () => (
		<div className="navbar justify-between p-0 m-0 w-full">
			<div>
				<ToggleButton variant="hamburger" toggleId="my-drawer-3" />
				<NavTitle />
			</div>
			<div className="flex gap-4">
				<HorizontalNavItems />
				<ThemeSwitcher />
				<Buttons />
			</div>
		</div>
	);

	const Buttons = () => (
		<>
			{CTA_LINK && (
				<Link
					className={`btn btn-sm ${styles.buttonOutline}`}
					href={CTA_LINK}
				>
					{CTA_TEXT}
				</Link>
			)}
		</>
	);

	return (
		<div className="drawer">
			<ToggleInput />
			<div className="drawer-content flex flex-col">
				<Container
					smallNav={true}
					className="px-2 md:px-4 lg:max-w-4xl xl:max-w-5xl"
				>
					<HorizontalNav />
					<Breadcrumbs />
				</Container>
				{pageContent}
			</div>
			<Drawer />
		</div>
	);
}
