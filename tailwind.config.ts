import type { Config } from "tailwindcss"

const config = {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
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
				border: "hsl(var(--border))",
				input: "hsl(var(--input))",
				ring: "hsl(var(--ring))",
				background: "hsl(var(--background))",
				foreground: "hsl(var(--foreground))",
				primary: {
					DEFAULT: "hsl(var(--primary))",
					foreground: "hsl(var(--primary-foreground))",
				},
				secondary: {
					DEFAULT: "hsl(var(--secondary))",
					foreground: "hsl(var(--secondary-foreground))",
				},
				destructive: {
					DEFAULT: "hsl(var(--destructive))",
					foreground: "hsl(var(--destructive-foreground))",
				},
				muted: {
					DEFAULT: "hsl(var(--muted))",
					foreground: "hsl(var(--muted-foreground))",
				},
				accent: {
					DEFAULT: "hsl(var(--accent))",
					foreground: "hsl(var(--accent-foreground))",
				},
				popover: {
					DEFAULT: "hsl(var(--popover))",
					foreground: "hsl(var(--popover-foreground))",
				},
				card: {
					DEFAULT: "hsl(var(--card))",
					foreground: "hsl(var(--card-foreground))",
				},
				blob1: "#984ddf",
				blob2: "#4344ad",
				blob3: "#74d9e1",
				blob4: "#050515",
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)",
			},
			keyframes: {
				"accordion-down": {
					from: { height: "0" },
					to: { height: "var(--radix-accordion-content-height)" },
				},
				"accordion-up": {
					from: { height: "var(--radix-accordion-content-height)" },
					to: { height: "0" },
				},
				rotate: {
					"0%": { transform: "rotate(0deg)" },
					"100%": { transform: "rotate(360deg)" },
				},
				blobAnim1: {
					"0%": {
						d: "path('M 100 600 q 0 -500, 500 -500 t 500 500 t -500 500 T 100 600 z')",
					},
					"30%": {
						d: "path('M 100 600 q -50 -400, 500 -500 t 450 550 t -500 500 T 100 600 z')",
					},
					"70%": {
						d: "path('M 100 600 q 0 -400, 500 -500 t 400 500 t -500 500 T 100 600 z')",
					},
					"100%": {
						d: "path('M 150 600 q 0 -600, 500 -500 t 500 550 t -500 500 T 150 600 z')",
					},
				},
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
				rotate: "rotate 25s infinite alternate ease-in-out",
				blobAnim1:
					"blobAnim1 5s infinite alternate cubic-bezier(0.45, 0.2, 0.55, 0.8)",
			},
		},
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
