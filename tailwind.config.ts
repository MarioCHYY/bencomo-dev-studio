import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				sans: ['"DM Sans"', 'sans-serif'],
				heading: ['Syne', 'sans-serif'],
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				surface: 'hsl(var(--surface))',
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'fadeUp': {
					from: { opacity: '0', transform: 'translateY(24px)' },
					to: { opacity: '1', transform: 'translateY(0)' }
				},
				'marquee': {
					'0%': { transform: 'translateX(0%)' },
					'100%': { transform: 'translateX(-50%)' }
				},
				'bulbFlicker': {
					'0%': { opacity: '0', filter: 'brightness(1)', textShadow: 'none' },
					'15%': { opacity: '0.3', filter: 'brightness(1)', textShadow: '0 0 10px rgba(125,211,252,0.3)' },
					'25%': { opacity: '0.1', filter: 'brightness(1)', textShadow: 'none' },
					'40%': { opacity: '0.6', filter: 'brightness(1)', textShadow: '0 0 20px rgba(125,211,252,0.6)' },
					'55%': { opacity: '0.2', filter: 'brightness(1)', textShadow: '0 0 5px rgba(125,211,252,0.2)' },
					'70%': { opacity: '0.8', filter: 'brightness(1)', textShadow: '0 0 30px rgba(125,211,252,0.8)' },
					'85%': { opacity: '0.4', filter: 'brightness(1)', textShadow: '0 0 15px rgba(125,211,252,0.4)' },
					'92%': { opacity: '1', filter: 'brightness(1)', textShadow: '0 0 40px rgba(125,211,252,1)' },
					'100%': { opacity: '1' },
				},
				'bulbBurnout': {
					'0%': { opacity: '0', filter: 'brightness(1)', textShadow: 'none' },
					'8%': { opacity: '0.4', filter: 'brightness(2)', textShadow: '0 0 15px rgba(251,146,60,0.4)' },
					'14%': { opacity: '0.1', filter: 'brightness(1)', textShadow: 'none' },
					'22%': { opacity: '0.6', filter: 'brightness(3)', textShadow: '0 0 25px rgba(251,146,60,0.6)' },
					'28%': { opacity: '0.15', filter: 'brightness(1)', textShadow: '0 0 5px rgba(251,146,60,0.2)' },
					'35%': { opacity: '0.8', filter: 'brightness(4)', textShadow: '0 0 35px rgba(251,146,60,0.9)' },
					'40%': { opacity: '0.3', filter: 'brightness(1.5)', textShadow: '0 0 10px rgba(251,146,60,0.3)' },
					'48%': { opacity: '0.95', filter: 'brightness(5)', textShadow: '0 0 50px rgba(251,191,36,1), 0 0 80px rgba(251,146,60,0.6)' },
					'50%, 100%': { opacity: '1' },
				},
				'sparkBurst': {
					'0%': { opacity: '0', scale: '0', transform: 'translate(0, 0)' },
					'20%': { opacity: '1', scale: '1.2' },
					'100%': { opacity: '0', scale: '0.3', transform: 'translate(var(--tx), var(--ty))' },
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fadeUp': 'fadeUp 0.6s ease forwards',
				'marquee': 'marquee 25s linear infinite'
			},
			boxShadow: {
				'2xs': 'var(--shadow-2xs)',
				xs: 'var(--shadow-xs)',
				sm: 'var(--shadow-sm)',
				md: 'var(--shadow-md)',
				lg: 'var(--shadow-lg)',
				xl: 'var(--shadow-xl)',
				'2xl': 'var(--shadow-2xl)'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
