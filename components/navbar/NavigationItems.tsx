"use client";

import Link from "next/link";
import React, { useCallback } from "react";
import routes from "../../lib/routes";
import { useRouter } from "next/navigation";

interface NavItem {
	route: {
		name: string;
		path: string;
		footerOnly?: boolean;
	};
	drawer?: boolean;
	currentPath: string;
	footer: boolean;
	closeMenu: () => void;
	inverted: boolean;
}

interface NavigationItemsProps {
	currentPath: string;
	footer?: boolean;
	closeMenu?: () => void;
	drawer?: boolean;
	inverted?: boolean;
}

const NavItem = React.memo(
	({ route, currentPath, footer, closeMenu, drawer, inverted }: NavItem) => {
		const { path, name } = route;
		const router = useRouter();
		const linkClass = `
			${drawer && "text-lg w-full justify-start btn-md"}
			${!footer && "btn btn-sm btn-ghost"}
			${footer && "link link-hover"} 
			${currentPath === path && "text-primary"}
			${inverted && "text-lightText"}
		`.trim();

		const handleClick = (e: React.MouseEvent) => {
			e.preventDefault();
			router.push(path);
			if (closeMenu) closeMenu();
		};

		return (
			<Link href={path} onClick={handleClick} className={linkClass}>
				{name}
			</Link>
		);
	}
);

const NavigationItems: React.FC<NavigationItemsProps> = ({
	currentPath,
	footer = false,
	drawer = false,
	closeMenu,
	inverted = false,
}) => {
	const handleMenuClose = useCallback(() => {
		if (closeMenu) closeMenu();
	}, [closeMenu]);

	const filteredRoutes = routes.filter((route) => {
		if (footer) {
			return true; // Show all routes in footer
		}
		return !route.footerOnly; // Only show non-footer-only routes in navbar
	});

	return (
		<>
			{filteredRoutes.map((route) => (
				<NavItem
					key={route.path}
					drawer={drawer}
					route={route}
					currentPath={currentPath}
					footer={footer}
					closeMenu={handleMenuClose}
					inverted={inverted}
				/>
			))}
		</>
	);
};

export default NavigationItems;
