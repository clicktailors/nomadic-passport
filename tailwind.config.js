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
					base: colors.light.text,
					primary: colors.light.primary,
					secondary: colors.light.secondary,
					"primary-content": colors.light.content,
					"secondary-content": colors.light.content,
					accent: colors.light.accent,
					"accent-content": colors.light.content,
					background: colors.light.background,
					"base-100": colors.light.background,
					"base-200": colors.light.borderColor,
					"base-300": colors.light.darkBg,
					"base-content": colors.light.text,
					neutral: colors.light.text,
					"neutral-content": colors.light.content,
					info: colors.light.primary,
					success: colors.light.secondary,
					warning: colors.light.gradientText,
					error: colors.light.accent,
					"--rounded-box": "1rem",
					"--rounded-btn": "0.5rem",
					"--rounded-badge": "1.9rem",
					"--animation-btn": "0.25s",
					"--animation-input": "0.2s",
					"--btn-focus-scale": "0.95",
					"--border-btn": "1px",
					"--tab-border": "1px",
					"--tab-radius": "0.5rem",
					"--tw-gradient-start": colors.light.
                    gradientStart,
                    "--tw-gradient-end": colors.light.
                    gradientEnd,
				},
				dark: {
					...require("daisyui/src/theming/themes")["dark"],
					base: colors.dark.text,
					primary: colors.dark.primary,
					secondary: colors.dark.secondary,
					"primary-content": colors.dark.content,
					"secondary-content": colors.dark.content,
					accent: colors.dark.accent,
					"accent-content": colors.dark.content,
					background: colors.dark.background,
					"base-100": colors.dark.background,
					"base-200": colors.dark.borderColor,
					"base-300": colors.dark.darkBg,
					"base-content": colors.dark.text,
					neutral: colors.dark.text,
					"neutral-content": colors.dark.content,
					info: colors.dark.primary,
					success: colors.dark.secondary,
					warning: colors.dark.gradientStart,
					error: colors.dark.accent,
					"--rounded-box": "1rem",
					"--rounded-btn": "0.5rem",
					"--rounded-badge": "1.9rem",
					"--animation-btn": "0.25s",
					"--animation-input": "0.2s",
					"--btn-focus-scale": "0.95",
					"--border-btn": "1px",
					"--tab-border": "1px",
					"--tab-radius": "0.5rem",
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
