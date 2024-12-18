"use client";

import { ThemeProvider as NextThemesProvider } from "../../utils/ThemeProvider";
import { ThemeProvider as PrimerThemeProvider } from "@primer/react-brand";

const providerProps = {
	attribute: "data-theme",
	defaultTheme: "system",
	themes: ["light", "dark"],
	colorMode: "dark",
};

export default function ClientProviders({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<NextThemesProvider {...providerProps}>
			<PrimerThemeProvider
				colorMode={providerProps.colorMode as "light" | "dark" | "auto"}
			>
				{children}
			</PrimerThemeProvider>
		</NextThemesProvider>
	);
}
