import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { styles } from "../../lib/styles";
import { SunIcon, MoonIcon, SystemIcon } from "../images/tsx/icons";

const ThemeSwitcher = () => {
	const [mounted, setMounted] = useState(false);
	const { theme, setTheme } = useTheme();

	useEffect(() => {
		setMounted(true);
		if (!theme) {
			setTheme("system");
		}
	}, [theme, setTheme]);

	const toggleTheme = () => {
		if (theme === "system") {
			setTheme("light");
		} else if (theme === "light") {
			setTheme("dark");
		} else {
			setTheme("system");
		}
	};

	// Render a placeholder button with the same dimensions
	if (!mounted) {
		return (
			<button
				className={`p-2 rounded-full ${styles.icon} opacity-0`}
				aria-hidden="true"
			>
				<SystemIcon />
			</button>
		);
	}

	return (
		<button
			onClick={toggleTheme}
			className={`p-2 rounded-full ${styles.icon}`}
			aria-label="Toggle theme"
		>
			{theme === "system" ? (
				<SystemIcon />
			) : theme === "light" ? (
				<SunIcon />
			) : (
				<MoonIcon />
			)}
		</button>
	);
};

export default ThemeSwitcher;
