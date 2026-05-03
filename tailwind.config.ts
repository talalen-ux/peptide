import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ocean: {
          50: "#e6f4f8",
          100: "#c2e3ed",
          200: "#8bc8db",
          300: "#4ecdc4",
          400: "#22b8a0",
          500: "#0d9488",
          600: "#0a766e",
          700: "#08594f",
          800: "#0a1822",
          900: "#030a0e",
        },
        bio: {
          green: "#00ffaa",
          teal: "#4ecdc4",
          red: "#ff6b6b",
          violet: "#a78bfa",
          amber: "#fbbf24",
        },
      },
      fontFamily: {
        display: ["var(--font-instrument-serif)", "Georgia", "serif"],
        heading: ["var(--font-syne)", "system-ui", "sans-serif"],
        body: ["var(--font-outfit)", "system-ui", "sans-serif"],
        mono: ["var(--font-ibm-plex-mono)", "Courier New", "monospace"],
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "glow-pulse": {
          "0%, 100%": { opacity: "0.3" },
          "50%": { opacity: "0.7" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        "slide-right": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s cubic-bezier(0.2, 0.8, 0.2, 1) forwards",
        "fade-in": "fade-in 0.5s ease-out forwards",
        "glow-pulse": "glow-pulse 4s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
        "slide-right": "slide-right 0.4s ease-out forwards",
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};

export default config;
