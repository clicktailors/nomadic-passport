"use client";

import { useTheme } from "next-themes";
import { colors } from "../../../lib/colors";

interface BlogPlaceholderProps {
	className?: string;
}

export default function BlogPlaceholder({ className = "" }: BlogPlaceholderProps) {
	const { resolvedTheme } = useTheme();
	const isDark = resolvedTheme === "dark";

	const bgColor = isDark ? colors.dark.background : colors.light.background;
	const iconBgColor = isDark ? colors.dark.borderColor : colors.light.borderColor;
	const iconFgColor = isDark ? colors.dark.text : colors.light.text;

	return (
		<svg
			width="100%"
			height="100%"
			viewBox="0 0 1200 630"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			className={className}
		>
			<rect width="1200" height="630" fill={bgColor} />
			<path
				d="M600 315m-120 0a120 120 0 1 0 240 0a120 120 0 1 0 -240 0"
				fill={iconBgColor}
				fillOpacity="0.1"
			/>
			<path
				d="M600 255a60 60 0 0 1 60 60v120a60 60 0 0 1-60 60 60 60 0 0 1-60-60v-120a60 60 0 0 1 60-60z"
				fill={iconFgColor}
				fillOpacity="0.2"
			/>
			<path
				d="M600 255a60 60 0 1 1 0-120 60 60 0 0 1 0 120z"
				fill={iconFgColor}
				fillOpacity="0.2"
			/>
		</svg>
	);
} 