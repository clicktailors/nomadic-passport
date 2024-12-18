/** @type {import('tailwindcss').Config} */
const { colors } = require("./lib/colors");
const { headingFont, textFont } = require("./lib/constants");

const getThemeColors = (isDark = false) => ({
	darkBg: isDark ? colors.dark.darkBg : colors.light.darkBg,
	lightText: isDark ? colors.dark.lightText : colors.light.lightText,
});

module.exports = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
		"./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
		"./node_modules/@primer/react-brand/dist/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			spacing: {
				28: "7rem",
			},
			letterSpacing: {
				tighter: "-.04em",
			},
			lineHeight: {
				tight: 1.2,
			},
			fontSize: {
				h1: ["2.5rem", { lineHeight: "1.2" }],
				h2: ["2rem", { lineHeight: "1.25" }],
				h3: ["1.75rem", { lineHeight: "1.3" }],
				h4: ["1.5rem", { lineHeight: "1.35" }],
				h5: ["1.25rem", { lineHeight: "1.4" }],
				h6: ["1rem", { lineHeight: "1.5" }],
				"5xl": "2.5rem",
				"6xl": "2.75rem",
				"7xl": "4.5rem",
				"8xl": "6.25rem",
			},
			boxShadow: {
				small: "0 5px 10px rgba(0, 0, 0, 0.12)",
				medium: "0 8px 30px rgba(0, 0, 0, 0.12)",
			},
			animation: {
				"gradient-xy": "gradient-xy 15s ease infinite",
			},
			keyframes: {
				"gradient-xy": {
					"0%, 100%": {
						"background-size": "400% 400%",
						"background-position": "left center",
					},
					"50%": {
						"background-size": "200% 200%",
						"background-position": "right center",
					},
				},
			},
			backgroundImage: {
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
			},
			borderRadius: {
				large: "1rem",
				medium: "0.5rem",
				small: "0.25rem",
			},
			colors: {
				darkBg: getThemeColors(true).darkBg,
				lightText: getThemeColors(true).lightText,
			},
		},
	},
	daisyui: {
		themes: [
			{
				light: {
					...require("daisyui/src/theming/themes")["light"],
					primary: colors.light.primary,
					secondary: colors.light.secondary,
					"primary-content": colors.light.content,
					background: colors.light.background,
					"base-100": colors.light.background,
					base: colors.light.text,
					colors: {
						lightText: colors.light.lightText,
						darkBg: colors.light.darkBg,
						"gradient-start": colors.light.gradientStart,
						"gradient-end": colors.light.gradientEnd,
					},
					"border-color": colors.light.borderColor,
					content: colors.light.content,
					"--tw-gradient-start": colors.light.gradientStart,
					"--tw-gradient-end": colors.light.gradientEnd,
				},
				dark: {
					...require("daisyui/src/theming/themes")["dark"],
					primary: colors.dark.primary,
					secondary: colors.dark.secondary,
					"primary-content": colors.dark.content,
					background: colors.dark.background,
					"base-100": colors.dark.background,
					base: colors.dark.text,
					colors: {
						"gradient-start": colors.dark.gradientStart,
						"gradient-end": colors.dark.gradientEnd,
						lightText: colors.dark.lightText,
						darkBg: colors.dark.darkBg,
					},
					"border-color": colors.dark.borderColor,
					content: colors.dark.content,
					"--tw-gradient-start": colors.dark.gradientStart,
					"--tw-gradient-end": colors.dark.gradientEnd,
				},
			},
		],
	},
	plugins: [
		function ({ addUtilities }) {
			addUtilities({
				".gradient-text": {
					background: `linear-gradient(90deg, ${colors.light.primary}, ${colors.light.secondary})`,
					"-webkit-background-clip": "text",
					"-webkit-text-fill-color": "transparent",
				},
			});
		},
		require("@tailwindcss/typography"),
		require("daisyui"),
	],
};
