// /** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	theme: {
		container: {
			center: true,
			padding: "2rem",
			screens: {
				"2xl": "1400px",
			},
		},
		extend: {
			colors: {
				primary: {
					500: "#FF7000",
					100: "#FFF1E6",
				},
				dark: {
					100: "#000000",
					200: "#0F1117",
					300: "#151821",
					400: "#212734",
					500: "#101012",
				},
				light: {
					900: "#FFFFFF",
					800: "#F4F6F8",
					850: "#FDFDFD",
					700: "#DCE3F1",
					500: "#7B8EC8",
					400: "#858EAD",
				},
				"accent-blue": "#1DA1F2",
				transparent: "transparent",
				white: "#fff",
				"off-white": "#f7f8f8",
				"transparent-white": "rgba(255, 255, 255, 0.08)",
				background: "#000212",
				grey: "#858699",
				"grey-dark": "#222326",
				"primary-text": "#b4bcd0",
			},
			fontFamily: {
				inter: ["var(--font-inter)"],
				spaceGrotesk: ["var(--font-spaceGrotesk)"],
			},
			boxShadow: {
				primary: "rgb(226,153,95) 0px 1px 15px",
				"light-100":
					"0px 12px 20px 0px rgba(184, 184, 184, 0.03), 0px 6px 12px 0px rgba(184, 184, 184, 0.02), 0px 2px 4px 0px rgba(184, 184, 184, 0.03)",
				"light-200": "10px 10px 20px 0px rgba(218, 213, 213, 0.10)",
				"light-300": "-10px 10px 20px 0px rgba(218, 213, 213, 0.10)",
				"dark-100": "0px 2px 10px 0px rgba(46, 52, 56, 0.10)",
				"dark-200": "2px 0px 20px 0px rgba(39, 36, 36, 0.04)",
			},
			backgroundImage: {
				"primary-gradient":
					"linear-gradient(92.88deg, rgb(69, 94, 181) 9.16%, rgb(86, 67, 204) 43.89%, rgb(103, 63, 215) 64.72%)",
				"page-gradient":
					"radial-gradient(ellipse 80% 50% at 50% -20%,rgba(255,112,0,0.3), transparent)",
				"hero-gradient":
					"radial-gradient(ellipse 50% 80% at 20% 40%,rgba(255,112,0,0.1),transparent), radial-gradient(ellipse 50% 80% at 80% 50%,rgba(226,153,95,0.15),transparent)",
				"hero-glow":
					"conic-gradient(from 230.29deg at 51.63% 52.16%, rgb(255,112,0) 0deg, rgb(255,96,0) 67.5deg, rgb(255,158,0) 198.75deg, rgb(255,109,0) 251.25deg, rgb(255,121,0) 301.88deg, rgb(255,84,0) 360deg)",
				"glow-lines":
					"linear-gradient(var(--direction),#ff7000 0.43%,#e2995f 14.11%,rgba(255,112,0,0) 62.95%)",
				"radial-faded":
					"radial-gradient(circle at bottom center,var(--color),transparent 70%)",
				"glass-gradient":
					"linear-gradient(rgba(255,112,0, 0) 0%, rgba(128,56,0, 0.05) 100%)",
			},
			screens: {
				xs: "420px",
			},
			transitionDelay: {
				0: "0ms",
			},
			keyframes: {
				"fade-in": {
					from: { opacity: 0, transform: "translateY(-10px)" },
					to: { opacity: 1, transform: "none" },
				},
				"image-rotate": {
					"0%": { transform: "rotateX(25deg)" },
					"25%": { transform: "rotateX(25deg) scale(0.9)" },
					"60%": { transform: "none" },
					"100%": { transform: "none" },
				},
				"image-glow": {
					"0%": {
						opacity: 0,
						"animation-timing-function": "cubic-bezier(0.74,0.25,0.76,1)",
					},
					"10%": {
						opacity: 1,
						"animation-timing-function": "cubic-bezier(0.12,0.01,0.08,0.99)",
					},
					"100%": {
						opacity: 0.2,
					},
				},
				"sketch-lines": {
					"0%": { "stroke-dashoffset": 1 },
					"50%": { "stroke-dashoffset": 0 },
					"99%": { "stroke-dashoffset": 0 },
					"100%": { visiblity: "hidden" },
				},
				"glow-line-horizontal": {
					"0%": { opacity: 0, transform: "translateX(0)" },
					"5%": { opacity: 1, transform: "translateX(0)" },
					"90%": { opacity: 1 },
					"100%": { opacity: 0, transform: "translateX(min(60vw, 45rem))" },
				},
				"glow-line-vertical": {
					"0%": { opacity: 0, transform: "translateY(0)" },
					"5%": { opacity: 1, transform: "translateY(0)" },
					"90%": { opacity: 1 },
					"100%": { opacity: 0, transform: "translateY(min(21vw, 45rem))" },
				},
				zap: {
					"0%, 9%, 11%, 100% ": {
						fill: "transparent",
					},
					"10%": {
						fill: "white",
					},
				},
				bounce: {
					"50%": {
						transform: "scale(0.98)",
					},
				},
				"accordion-down": {
					from: { height: 0 },
					to: { height: "var(--radix-accordion-content-height)" },
				},
				"accordion-up": {
					from: { height: "var(--radix-accordion-content-height)" },
					to: { height: 0 },
				},
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
				"fade-in": "fade-in 1000ms var(--animation-delay, 0ms) ease forwards",
				"image-rotate": "image-rotate 1400ms ease forwards",
				"image-glow": "image-glow 4100ms 600ms ease-out forwards",
				"sketch-lines": "sketch-lines 1200ms ease-out forwards",
				"glow-line-horizontal":
					"glow-line-horizontal var(--animation-duration) ease-in forwards",
				"glow-line-vertical":
					"glow-line-vertical var(--animation-duration) ease-in forwards",
				zap: "zap 2250ms calc(var(--index) * 20ms) linear infinite",
				bounce: "240ms ease 0s 1 running bounce",
			},
		},
	},
	plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
};
