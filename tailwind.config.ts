import type { Config } from "tailwindcss";

export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			keyframes: {
				keyframes: {
					highlightFlash: {
						"0%": {
							background: "transparent",
							transform: "scale(1)",
						},
						"30%": {
							background: "color-mix(in srgb, var(--accent) 20%, transparent)",
							transform: "scale(1.02)",
						},
						"100%": {
							background: "transparent",
							transform: "scale(1)",
						},
					},
				},
			},
			animation: {
				highlightFlash: "highlightFlash 1s ease",
			},
		},
	},
	darkMode: "class",
	plugins: [],
} satisfies Config;
